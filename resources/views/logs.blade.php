@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/logs.css') }}">
<link rel="stylesheet" href="{{ asset('css/bulma-divider.min.css') }}">
@endsection

@section('body')
<div class="tabs is-boxed mt-3">
	<ul>
		<li id="reports" class="is-active">
			<a>Report Logs</a>
		</li>
		@if (Auth::user()->type == 'ADMIN' || Auth::user()->type == 'SUPER')
		<li id="admin">
			<a>Admin Logs</a>
		</li>
		@endif
	</ul>
</div>
<div id="reports_content" class="container is-fluid">
	<form id="search_reports">
		<div class="field has-addons">
			<div class="control is-expanded">
				<input type="text" class="input" placeholder="Search location, username, severity, or date...">
			</div>
			<div class="control">
				<button class="button is-success" type="button">
					<span class="icon is-left">
						<i class="fas fa-search"></i>
					</span>
				</button>
			</div>
		</div>
	</form>
	Reports
</div>
@if (Auth::user()->type == 'ADMIN' || Auth::user()->type == 'SUPER')
<div id="admin_content" class="container is-fluid is-hidden">
	<form id="search_admin">
		<div class="field has-addons">
			<div class="control is-expanded">
				<input type="text" class="input" placeholder="Search username, activity, or date...">
			</div>
			<div class="control">
				<button class="button is-success" type="button">
					<span class="icon is-left">
						<i class="fas fa-search"></i>
					</span>
				</button>
			</div>
		</div>
	</form>

	@if (count($logs) > 0)
	@php
	$previousDate = "";
	@endphp
	@foreach ($logs as $log)
	@if (Auth::user()->type == 'ADMIN')
	@if ($log->user->type != 'USER' && $log->user->type != 'SUPER')
	@if ($previousDate != \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY'))
	@php
	$previousDate = \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY');
	@endphp
	<div class="divider is-left">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY') }}</div>
	@endif
	<a class="box" href="{{ $log->user->username }}" data-user="{{ $log->user->username }}">
		<div class="help">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY - hh:mma') }}</div>
		<p>{{ $log->description }}</p>
	</a>
	@endif
	@else
	@if ($previousDate != \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY'))
	@php
	$previousDate = \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY');
	@endphp
	<div class="divider is-left">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY') }}</div>
	@endif
	<a class="box" href="{{ $log->user->username }}" data-user="{{ $log->user->username }}">
		<div class="help">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY - hh:mma') }}</div>
		<p>{{ $log->description }}</p>
		<div class="help has-text-grey">{{ $log->ip_address }}</div>
	</a>
	@endif
	@endforeach
	<hr>
	@else
	<div class="has-text-centered">No logs found.</div>
	@endif
</div>
@endif
@endsection

@section('scripts')
<script src="{{ asset('js/logs.js') }}"></script>
@endsection