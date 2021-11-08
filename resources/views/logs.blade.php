@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/logs.css') }}">
<link rel="stylesheet" href="{{ asset('css/bulma-divider.min.css') }}">
@endsection

@section('body')
<div class="tabs is-boxed mt-2">
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

{{--REPORT LOGS--}}
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

	@if (count($reportlogs) > 0) 
	@php
	$previousDate = ""; 
	@endphp
	@foreach ($reportlogs as $log)
	@if ($previousDate != \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY'))
	@php
	$previousDate = \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY');
	@endphp
	<div class="divider is-left">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY') }}</div>
	@endif
	<div class="box {{ strtolower($log->report->severity) }} px-3 py-4" data-id="{{ $log->report_id }}">
		<div class="media">
			<div class="media-content">
				<div class="help">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY - hh:mma') }}</div>
				<p>{{ $log->description }}</p>
			</div>
			<figure class="media-right">
				<p class="image is-48x48">
					<img src="{{ asset('reports/' . $log->report->picture) }}" alt="Report #{{ $log->report->id }}">
				</p>
			</figure>
		</div>
	</div>
	@endforeach
	<hr>
	@else
	<div class="has-text-centered mt-3">No logs found.</div>
	@endif
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

	@if (count($adminlogs) > 0) 
	@php
	$previousDate = ""; 
	@endphp
	@foreach ($adminlogs as $log)
	@if ($previousDate != \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY'))
	@php
	$previousDate = \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY');
	@endphp
	<div class="divider is-left">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY') }}</div>
	@endif
	<a class="box" href="{{ $log->user->username }}" data-user="{{ $log->user->username }}">
		<div class="help">{{ \Carbon\Carbon::parse($log->created_at)->isoFormat('MMM D, YYYY - hh:mma') }}</div>
		<p>{{ $log->description }}</p>
		<div class="help has-text-grey">{{ $log->ip_address }}</div>
	</a>
	@endforeach
	<hr>
	@else
	<div class="has-text-centered mt-3">No logs found.</div>
	@endif
</div>
@endif

<div class="modal">
	<div class="modal-background"></div>
	<div id="loader" class="modal-card">
		<div class="modal-card-body">
			<span class="icon is-large has-text-success">
				<i class="fas fa-circle-notch fa-spin fa-3x"></i>
			</span>
		</div>
	</div>
	<div class="modal-content is-hidden">
		<div class="card mx-4">
			<div class="card-image">
				<p class="image is-1by1">
					<img src="" alt="">
				</p>
			</div>
			<div class="card-content">
				<div class="content">
					<p id="date" class="is-size-7 has-text-weight-light is-pulled-right"></p>             
					<p id="title" class="is-size-5 has-text-weight-bold mb-1"></p>
					<p id="reporter" class="is-size-7 has-text-weight-medium" data-base="{{ url('') }}">Reported by: <a href=""></a></p>
					<p id="address" class="is-size-7 has-text-weight-medium"></p>
					<p id="description" class="is-size-6"></p>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
<script id="logs" src="{{ asset('js/logs.js') }}" data-base="{{ asset('reports') }}"></script>
@endsection