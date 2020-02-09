@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
@endsection

@section('body')
{{-- Desktop View --}}
<div class="is-hidden-touch">
	<nav class="navbar is-fixed-top" role="navigation">
		<form method="POST">
			@csrf
			<button class="button is-danger">Logout</button>
		</form>
	</nav>
</div>

{{-- Mobile View --}}
<div class="is-hidden-desktop has-text-centered">
	<nav class="navbar is-fixed-top">
		<div class="navbar-brand">
			<form method="POST">
				@csrf
				<button class="button is-danger">Logout</button>
			</form>
		</div>
	</nav>
	<nav class="navbar is-fixed-bottom">
		<div class="navbar-brand">
			<a id="profile" class="navbar-item"><i class="is-size-4 fas fa-user"></i></a>
			<a id="settings" class="navbar-item"><i class="is-size-4 fas fa-bars"></i></a>
		</div>
	</nav>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/dashboard.js') }}"></script>
@endsection