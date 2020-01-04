<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class IndexController extends Controller
{
	public function login() {
		if (Auth::user()) {
			return redirect('');
		}	
		return view('login');
	}

	public function register() {
		if (Auth::user()) {
			return redirect('');
		}
		return view('register');
	}

	public function dashboard() {
		return view('dashboard');
	}
}
