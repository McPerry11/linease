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
		<li id="admin">
			<a>Admin Logs</a>
		</li>
	</ul>
</div>
<div id="reports_content" class="container is-fluid">
	Reports
</div>
<div id="admin_content" class="container is-fluid is-hidden">
	@if (count($logs) > 0)
	@php
	$previousDate = "";
	@endphp
	@foreach ($logs as $log)
	@if ($previousDate != \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY'))
	@php
	$previousDate = \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY');
	@endphp
	<div class="divider is-left">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY') }}</div>
	@endif
	@if (Auth::user()->type == 'ADMIN')
	@if ($log->user->type != 'USER' || $log->user->type != 'SUPER')
	<a class="box" href="{{ $log->user->username }}">
		<div class="help">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY - hh:mma') }}</div>
		<p>{{ $log->description }}</p>
	</a>
	@endif
	@else
	<a class="box" href="{{ $log->user->username }}">
		<div class="help">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MM/DD/YYYY - hh:mma') }}</div>
		<p>{{ $log->description }}</p>
		<div class="help has-text-grey">{{ $log->ip_address }}</div>
	</a>
	@endif
	@endforeach
	@else
	<div class="help is-centered">No logs found.</div>
	@endif
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/logs.js') }}"></script>
@endsection