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
		return view('dashboard', [
			'user' => $user
		]);
	}

	public function accounts() {
		if (in_array(Auth::user()->type, ['ADMIN', 'SUPER'])) {
			if (Auth::user()->type == 'SUPER')
				$users = User::where('type', 'ADMIN')->orderBy('created_at', 'desc')->get();
			else
				$users = User::where('type', 'FACIL')->orderBy('created_at', 'desc')->get();

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
		$reportlogs = Log::whereNotNull('report_id')->orderBy('created_at', 'desc')->get();
		if (in_array(Auth::user()->type, ['ADMIN', 'SUPER'])) {
			if (Auth::user()->type == 'SUPER') {
				$adminlogs = Log::whereNull('report_id')->orderBy('created_at', 'desc')->get();
			} else {
				$user_ids = User::select('id')->whereIn('type', ['FACIL', 'ADMIN'])->get();
				$adminlogs = Log::whereNull('report_id')->whereIn('user_id', $user_ids)->get();
			}
			return view('logs', [
				'adminlogs' => $adminlogs,
				'reportlogs'=> $reportlogs
			]);
		}
		return view('logs', [
			'reportlogs'=> $reportlogs
		]);
	}

	public function desktop() {
		return view('desktop');
	}

	public function notfound() {
		return view('notfound');
	}
}
