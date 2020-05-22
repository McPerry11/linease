<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UsersController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    switch ($request->data) {
      case 'username':
      $identical = User::where('username', $request->username)->get();
      if (count($identical) > 0) {
        $response = array(
          'status' => 'error',
          'msg' => 'Username is already taken'
        );
      } else {
        $response = array(
          'status' => 'success'
        );
      }
      break;

      case 'email':
      $identical = User::where('email', $request->email)->get();
      if (count($identical) > 0) {
        $response = array(
          'status' => 'error',
          'msg' => 'Email address is already taken'
        );
      } else {
        $response = array(
          'status' => 'success'
        );
      }
      break;
    }

    return response()->json($response);
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
    $user = new User;

    $user->fill($request->only([
      'username',
      'email',
      'password'
    ]));

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
    $user = User::where('username', $username)->get();
    $user = $user[0];
    $name = null;
    if ($user->firstname) {
      $name = $user->firstname;
    }
    if ($user->middlename) {
      $name = $name . ' ' . $user->middlename;
    }
    if ($user->lastname) {
      $name = $name . ' ' . $user->lastname;
    }
    return view('profile', [
      'user' => $user,
      'name' => $name,
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
    $user = User::where('username', $username)->get();
    $user = $user[0];
    return view('accdetails', [
      'user' => $user,
    ]);
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
