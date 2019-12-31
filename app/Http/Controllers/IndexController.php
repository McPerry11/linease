<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
	public function login() {
		return view('login');
	}

	public function dashboard() {
		return view('dashboard');
	}
}
