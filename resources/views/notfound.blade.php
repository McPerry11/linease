@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/notfound.css') }}">
@endsection

@section('body')
<figure class="image is-128x128">
	<img src="{{ asset('img/LineaseLogo.png') }}" alt="LinEase Logo">
</figure>
<h4 class="subtitle is-4 has-text-white has-text-centered mt-5">LinEase with Ease</h4>
<h1 class="is-size-1 has-text-weight-bold has-text-white has-text-centered">404</h1>
<h3 class="is-size-3 has-text-weight-semibold has-text-white has-text-centered">Page not found</h3>
<div class="level mt-6">
	<a href="{{ url(route('dashboard')) }}" class="level-item has-text-white icon-text">
		<span class="icon">
			<i class="fas fa-chevron-left"></i>
		</span>
		<span>Go to Dashboard</span>
	</a>
</div>
@endsection