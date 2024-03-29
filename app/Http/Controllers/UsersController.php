<?php

namespace App\Http\Controllers;

use Auth;
use App\Log;
use App\User;
use App\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Storage;

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
      return response()->json(array('status' => 'error', 'data' => 'pass', 'msg' => 'Password must be at least 8 characters', 'warn' => 'Password must be a minimum length of 8 characters'));

    if ($request->password != $request->confirm)
      return response()->json(array('status' => 'error', 'data' => 'confirm', 'msg' => 'Passwords do not match', 'warn' => 'Passwords do not match.'));

    $user = new User;
    $user->username = strip_tags($request->username);
    $user->email = strip_tags($request->email);
    $user->password = strip_tags($request->password);

    if (Auth::check()) {
      $user->firstname = strip_tags($request->firstname);
      $user->lastname = strip_tags($request->lastname);
      $user->verified = true;
      if (Auth::user()->type == 'SUPER') {
        $user->type = 'ADMIN';
      } else {
        $user->type = 'FACIL';
      }
    } else {
      $user->type = 'USER';
    }
    
    $user->save();


    if ($request->data != 'accounts') {
      Log::create([
        'user_id' => $user->id,
        'description' => $user->username . ' just registered as a new unverified user.',
        'ip_address' => $request->ip(),
      ]);
      return response()->json(array('msg' => 'Unverified Account Registered'));
    } else {
      $role = $user->type == 'ADMIN' ? 'Admin' : 'Facilitator';
      Log::create([
        'user_id' => Auth::id(),
        'description' => Auth::user()->username . ' just registered ' . $user->username . ' as a new ' . $role . '.',
        'ip_address' => $request->ip()
      ]);

      return response()->json(['msg' => $role . ' Account Registered']);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($username)
  {
    $user = User::select('id', 'username', 'firstname', 'middlename', 'lastname', 'email', 'city', 'birthdate', 'avatar', 'type')
    ->where('username', $username)->get();
    if (count($user) == 0)
      return redirect('not_found');
    else
      $user = $user[0];
    $name = null;
    if (in_array(URL::previous(), [url('logs'), url('accounts')])) {
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

    // REPORTS
    $reports = Report::select('id', 'severity','address', 'created_at', 'picture', 'description')
    ->where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

    return view('profile',  [
      'username' => $username,
      'user' => $user,
      'name' => $name,
      'previousPage' => $link,
      'page' => $page,
      'reports' => $reports
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit(Request $request, $username)
  {
    if ($request->data == 'user') {
      $user = User::where('username', $request->username)->get()[0];
      return response()->json($user);
    } else if ($request->data == 'username') {
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

    if ($request->tab == 'ob') {
      $user = User::where('username', $username)->get()[0];

      switch($request->module) {
        case 'dashboard':
        $user->ob_dashboard = true;
        break;

        case 'profile':
        $user->ob_profile = true;
        break;

        case 'accounts':
        $user->ob_accounts = true;
        break;

        case 'logs':
        $user->ob_logs = true;
        break;

        case 'camera':
        $user->ob_camera = true;
        break;
      }
      $user->save();

      return response()->json('success');
    } else if ($request->tab == 'security') {
      $user = User::where('username', $username)->get()[0];

      $user->password = Hash::make($request->new);
      $user->save();
      Auth::login($user);

      return response()->json(['msg' => 'Password Updated']);
    } else if ($request->tab == 'profile') {
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

      $user->verified = true;
      $user->username = strip_tags($request->data['username']);
      $user->firstname = strip_tags($request->data['firstname']);
      $user->lastname = strip_tags($request->data['lastname']);
      $user->email = strip_tags($request->data['email']);
      if ($request->module != 'accounts') {
        $user->middlename = strip_tags($request->data['middlename']);
        // $user->phone = strip_tags($request->data['phone']);
        $user->city = strip_tags($request->data['city']);
        $user->birthdate = strip_tags($request->data['birthdate']);
      }
      
      $user->save();
      if ($request->module != 'accounts') {
        $user = User::select('username', 'firstname', 'lastname', 'middlename', 'email', 'city', 'birthdate')->where('username', $user->username)->get()[0];
        $user->birthdate = Carbon::parse($user->birthdate)->isoFormat('YYYY-MM-DD');
        $date = Carbon::parse($user->birthdate)->isoFormat('MM/DD/YYYY');
        $name = $user->firstname . ' ' . ($user->middlename ?? '') . ' ' . $user->lastname;
        return response()->json(['msg' => 'Profile Updated', 'data' => $user, 'name' => $name, 'date' => $date]);
      } else {
        Log::create([
          'user_id' => Auth::id(),
          'description' => Auth::username() . ' updated ' . $user->username . '\'s account.',
          'ip_address' => $request->ip()
        ]);

        return response()->json(['msg' => 'Account Updated']);
      }
    } else {
      $request->validate([
        'file' => 'required|image|max:5000'
      ]);
      $user = User::where('username', $username)->get()[0];
      Storage::disk('avatars')->delete($user->avatar);

      $time = Carbon::now()->isoFormat('MMDDYYYY-HHmmss');
      $filename = Auth::id() . $time . '.' . $request->file->getClientOriginalExtension();
      $user->avatar = $filename;

      $user->save();
      $request->file->move(public_path('avatars'), $filename);

      return response()->json(['msg' => 'Profile Picture Updated', 'avatar' => $filename]);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request, $username)
  {
    $user = User::where('username', $username)->get()[0];

    Log::create([
      'user_id' => Auth::id(),
      'description' => Auth::user()->username . ' deleted ' . $user->username . '\'s account',
      'ip_address' => $request->ip()
    ]);
    $user->delete();

    return response()->json(['status' => 'success']);
  }
}
