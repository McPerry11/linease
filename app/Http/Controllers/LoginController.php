<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
	public function login(Request $request) {
		$credentials = $request->only(['username', 'password']);

		if (Auth::attempt($credentials)) {
			return response()->json([
				'status' => 'success',
				'message' => 'Logged In Successfully',
			]);
		}
		return response()->json([
			'status' => 'error',
			'message' => 'Invalid username and/or password',
		]);
	}

	public function logout(Request $request) {
		Auth::logout();
		return redirect('login');
	}
}
