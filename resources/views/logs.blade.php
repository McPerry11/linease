@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/logs.css') }}">
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
	<div class="help">10/24/2020</div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/logs.js') }}"></script>
@endsection