<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;

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
    if (Auth::user()) {
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
    $regex = '/^(?=.{5,30})[\w\.]*[a-z0-9]+[\w\.]*$/i';
    if (preg_match($regex, $request->username)) {
      $identical = User::where('username', $request->username)->count();
      if ($identical > 0)
        return response()->json(array('status' => 'error', 'data' => 'username', 'msg' => 'Username is already taken.', 'warn' => 'Username is already taken'));
    } else {
      return response()->json(array('status' => 'error', 'data' => 'username', 'msg' => 'Invalid format of username', 'warn' => 'Invalid format. Use alphanumeric characters, period, and underscore'));
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
    $user->created_at = Carbon::now('+8:00');
    $user->updated_at = Carbon::now('+8:00');

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
    $user = User::select('username', 'firstname', 'middlename', 'lastname', 'email', 'phone', 'city', 'birthdate', 'avatar_id')
    ->where('username', $username)->get()[0];
    $name = null;
    if ($user->firstname && $user->lastname)
      $name = $user->firstname . $user->middlename ?? '' . $user->lastname;
    return view('profile', [
      'username' => $username,
      'user' => $user,
      'name' => $name
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($username)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    //
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
