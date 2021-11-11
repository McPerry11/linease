@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/desktop.css') }}">
@endsection

@section('body')
<div class="container is-fluid">
	<div class="columns is-vcentered is-centered">
		<div class="column is-narrow">
			<figure class="image is-128x128">
				<img src="{{ asset('img/LineaseLogo.png') }}" alt="LinEase Logo">
			</figure>
			<h4 class="subtitle is-4 has-text-centered mt-5">LinEase with Ease</h4>
		</div>
		<div class="column is-6">
			<h2 class="is-size-3 has-text-centered-mobile">Unavailable on Desktop</h2>
			<h4 class="is-size-5 has-text-centered-mobile">LinEase is currently on mobile only</h4>
			<div class="level is-mobile mt-4">
				<div class="level-item">
					<figure class="image">
						<img src="{{ asset('img/ss1.png') }}" alt="LinEase Screenshot 1">
					</figure>
				</div>
				<div class="level-item">
					<figure class="image">
						<img src="{{ asset('img/ss3.png') }}" alt="LinEase Screenshot 2">
					</figure>
				</div>
				<div class="level-item">
					<figure class="image">
						<img src="{{ asset('img/ss2.png') }}" alt="LinEase Screenshot 3">
					</figure>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
<script>
	$('html').removeClass('has-navbar-fixed-top');
</script>
@endsection