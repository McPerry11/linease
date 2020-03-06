<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;

class IndexController extends Controller
{
	public function login() {
		if (Auth::user()) {
			return redirect('');
		}	
		return view('login');
	}

	public function dashboard() {
		$user = Auth::user();
		return view('dashboard', [
			'user' => $user,
			]);
	}

	public function accounts() {
		if (Auth::user()->type == 'ADMIN' || Auth::user()->type == 'SUPER') {
			return view('accounts');
		} else {
			return redirect('');
		}
	}

	public function settings() {
		return view('settings');
	}

	public function logs() {
		return view('logs');
	}
}
