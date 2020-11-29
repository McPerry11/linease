<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
	public function login(Request $request) {
		$credentials = $request->only(['username', 'password']);

		if (Auth::attempt($credentials, true)) {
			Log::create([
				'user_id' => Auth::id(),
				'description' => Auth::user()->username . ' has logged in.',
				'ip_address' => $request->ip(),
			]);
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
		Log::create([
			'user_id' => Auth::id(),
			'description' => Auth::user()->username . ' has logged out.',
			'ip_address' => $request->ip(),
		]);
		Auth::logout();
		return redirect('login');
	}
}
