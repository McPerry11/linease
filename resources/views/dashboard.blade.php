@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/navbar.css') }}">
<link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
@endsection

@section('body')
@include('_navbar')
{{-- Desktop View --}}
<div class="is-hidden-touch">
	Hello World
</div>

{{-- Mobile View --}}
<div class="is-hidden-desktop">
	<form method="POST">
		@csrf
		<button class="button is-danger">Logout</button>
	</form>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/dashboard.js') }}"></script>
@endsection