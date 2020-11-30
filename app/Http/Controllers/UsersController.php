<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

class UsersController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    if ($request->data == 'username') {
      $identical = User::where('username', $request->username)->count();
      if ($identical > 0) {
        $response = array(
          'status' => 'error',
          'msg' => 'Username is already taken'
        );
      } else {
        $response = array(
          'status' => 'success'
        );
      }
    } else if ($request->data == 'email') {
      $identical = User::where('email', $request->email)->count();
      if ($identical > 0) {
        $response = array(
          'status' => 'error',
          'msg' => 'Email address is already taken'
        );
      } else {
        $response = array(
          'status' => 'success'
        );
      }
    }
    return $response;
  }


  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    if (Auth::check()) {
      return redirect('');
    }
    return view('register');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $regex = '/^(?=.{5,20})[\w\.]*[a-z0-9]+[\w\.]*$/i';
    if (preg_match($regex, $request->username)) {
      $identical = User::where('username', $request->username)->count();
      if ($identical > 0)
        return response()->json(array('status' => 'error', 'data' => 'username', 'msg' => 'Username is already taken.', 'warn' => 'Username is already taken'));
    } else {
      return response()->json(array('status' => 'error', 'data' => 'username', 'msg' => 'Invalid format of username', 'warn' => 'Username must be between 5 to 20 characters with at least 1 alphanumeric character'));
    }
    
    $regex = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/';
    if (preg_match($regex, $request->email)) {
      $identical = User::where('email', $request->email)->count();
      if ($identical > 0)
        return response()->json(array('status' => 'error', 'data' => 'email', 'msg' => 'Email address is already taken.', 'warn' => 'Email address is already taken'));
    } else {
      return response()->json(array('status' => 'error', 'data' => 'email', 'msg' => 'Invalid format of email address', 'warn' => 'Invalid format of email address'));
    }

    if (strlen($request->password) < 8)
      return response()->json(array('status' => 'error', 'data' => 'password', 'msg' => 'Password must be at least 8 characters', 'warn' => 'Password must be a minimum length of 8 characters'));

    if ($request->password != $request->confirm)
      return response()->json(array('status' => 'error', 'data' => 'confirm', 'msg' => 'Passwords do not match', 'warn' => 'Passwords do not match.'));

    $user = new User;
    $user->username = strip_tags($request->username);
    $user->email = strip_tags($request->email);
    $user->password = strip_tags($request->password);

    $user->type = 'USER';
    
    $user->save();

    return response()->json(array('msg' => 'Unverified account registered successfully'));
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($username)
  {
    $user = User::select('username', 'firstname', 'middlename', 'lastname', 'email', 'city', 'birthdate', 'avatar_id')
    ->where('username', $username)->get()[0];
    $name = null;
    if (URL::previous() == url('logs') || URL::previous() == url('accounts')) {
      $link = URL::previous();
      if (URL::previous() == url('logs'))
        $page = 'Logs';
      else
        $page = 'Accounts';
    } else {
      $link = route('dashboard');
      $page = 'Dashboard';
    }

    if ($user->firstname && $user->lastname)
      $name = $user->firstname . ' ' . ($user->middlename ?? '') . ' ' . $user->lastname;
    return view('profile', [
      'username' => $username,
      'user' => $user,
      'name' => $name,
      'previousPage' => $link,
      'page' => $page
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($username, Request $request)
  {
    if ($request->data == 'username') {
      if ($request->username != $username) {
        $count = User::where('username', $request->username)->count();
        if ($count > 0)
          return response()->json(['msg' => 'Username is already taken']);
      }
    } else if ($request->data == 'email') {
      $user = User::where('username', $username)->get()[0];
      if ($request->email != $user->email) {
        $count = User::where('email', $request->email)->count();
        if ($count > 0)
          return response()->json(['msg' => 'Email address is already taken']);
      }
    } else if ($request->data == 'phone') {
      $user = User::where('username', $username)->get()[0];
      if ($request->phone != $user->phone) {
        $count = User::where('phone', $request->phone)->count();
        if ($count > 0)
          return response()->json(['msg' => 'Phone number is already taken']);
      }
    } else if ($request->data == 'current') {
      $user = User::where('username', $username)->get()[0];
      if (Hash::check($request->password, $user->password))
        return response()->json(['status' => 'success']);
      return response()->json(['status' => 'error', 'msg' => 'Incorrect Password']);
    } else {
      $user = User::where('username', $username)->get()[0];
      if (Hash::check($request->password, $user->password))
        return response()->json(['status' => 'error', 'msg' => 'New password should not be the same as previous one']);
      return response()->json(['status' => 'success']);
    }
    return response()->json(['status' => 'success']);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $username)
  {
    $user = User::where('username', $username)->get()[0];

    if ($request->tab == 'profile') {
      $regex = '/^(?=.{5,20})[\w\.]*[a-z0-9]+[\w\.]*$/i';
      if (preg_match($regex, $request->data['username'])) {
        if ($request->data['username'] != $username) {
          $identical = User::where('username', $request->data['username'])->count();
          if ($identical > 0)
            return response()->json(['status' => 'error', 'data' => 'username', 'msg' => 'Username is already taken.', 'warn' => 'Username is already taken']);
        }
      } else {
        return response()->json(['status' => 'error', 'data' => 'username', 'msg' => 'Invalid format of username', 'warn' => 'Username must be between 5 to 20 characters with at least 1 alphanumeric character']);
      }

      $regex = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/';
      if (preg_match($regex, $request->data['email'])) {
        if ($request->data['email'] != $user->email) {
          $identical = User::where('email', $request->data['email'])->count();
          if ($identical > 0)
            return response()->json(array('status' => 'error', 'data' => 'email', 'msg' => 'Email address is already taken.', 'warn' => 'Email address is already taken'));
        }
      } else {
        return response()->json(array('status' => 'error', 'data' => 'email', 'msg' => 'Invalid email address', 'warn' => 'Invalid email address'));
      }

      // $regex = '/^[0-9]{10}$/';
      // if (preg_match($regex, $request->data['phone'])) {
      //   if ($request->data['phone'] != $user->phone) {
      //     $identical = User::where('phone', $request->data['phone'])->where('phone', '<>', $user->phone)->count();
      //     if ($identical > 0)
      //       return response()->json(array('status' => 'error', 'data' => 'phone', 'msg' => 'Phone number is already taken.', 'warn' => 'Phone number is already taken'));
      //   }
      // } else {
      //   return response()->json(array('status' => 'error', 'data' => 'phone', 'msg' => 'Invalid phone number.', 'warn' => 'Invalid phone number'));
      // }

      $user->username = strip_tags($request->data['username']);
      $user->firstname = strip_tags($request->data['firstname']);
      $user->lastname = strip_tags($request->data['lastname']);
      $user->middlename = strip_tags($request->data['middlename']);
      $user->email = strip_tags($request->data['email']);
      // $user->phone = strip_tags($request->data['phone']);
      $user->city = strip_tags($request->data['city']);
      $user->birthdate = strip_tags($request->data['birthdate']);
      
      $user->save();
      $user = User::select('username', 'firstname', 'lastname', 'middlename', 'email', 'city', 'birthdate')->where('username', $user->username)->get()[0];
      $user->birthdate = Carbon::parse($user->birthdate)->isoFormat('YYYY-MM-DD');
      $date = Carbon::parse($user->birthdate)->isoFormat('MM/DD/YYYY');
      $name = $user->firstname . ' ' . ($user->middlename ?? '') . ' ' . $user->lastname;
      return response()->json(['msg' => 'Profile Updated', 'data' => $user, 'name' => $name, 'date' => $date]);

    } else {
      $user = User::where('username', $username)->get()[0];

      $user->password = Hash::make($request->new);
      $user->save();
      Auth::login($user);

      return response()->json(['msg' => 'Password Updated']);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }
}
