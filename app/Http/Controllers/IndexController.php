<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;
use App\Log;

class IndexController extends Controller
{
	public function login() {
		if (Auth::check())
			return redirect('');
		return view('login');
	}

	public function dashboard() {
		$user = Auth::user();
		return view('dashboard');
	}

	public function accounts() {
		if (Auth::user()->type == 'ADMIN' || Auth::user()->type == 'SUPER') {
			$users = User::whereIn('type', ['FACIL', 'ADMIN', 'SUPER'])->get();
			return view('accounts', [
				'users' => $users
			]);
		} else {
			return redirect('');
		}
	}

	public function settings() {
		return view('settings');
	}

	public function logs() {
		$logs = Log::orderBy('created_at', 'desc')->get();
		return view('logs', [
			'logs' => $logs
		]);
	}

	public function desktop() {
		return view('desktop');
	}

	public function notfound() {
		return view('notfound');
	}
}
