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
    $users = User::all();
    if ($request->source == 'registration') {
      $identical = 0;
      if ($request->data == 'username') {
        foreach ($users as $user) {
          if ($user->username == $request->username) {
            $identical++;
          }
        }

        if ($identical > 0) {
          $response = array(
            'status' => 'error',
            'msg' => 'Username is already taken',
            );
        } else {
          $response = array(
            'status' => 'success',
            );
        }

      } else if ($request->data == 'email') {
        foreach ($users as $user) {
          if ($user->email == $request->email) {
            $identical++;
          }
        }

        if ($identical > 0) {
          $response = array(
            'status' => 'error',
            'msg' => 'Email Address is already taken',
            );
        } else {
          $response = array(
            'status' => 'success',
            );
        }

      }
      return response()->json($response);
    }
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

    return redirect('login')->with('status', 'Registered Successfully');
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
    return view('profile', [
      'user' => $user,
      ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
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
