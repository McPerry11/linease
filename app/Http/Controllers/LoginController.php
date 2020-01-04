<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
	public function login(Request $request) {
		$credentials = $request->only(['username', 'password']);

		if (Auth::attempt($credentials)) {
			return redirect('');
		} 
		return view('login', [
			'message' => 'Invalid username and/or password',
			'username' => $request->username,
		]);
	}

	public function logout(Request $request) {
		Auth::logout();
		return redirect('login');
	}
}