@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/camera.css') }}">
@endsection

@section('body')
<div id="camera"></div>
<nav class="navbar is-fixed-bottom">
	<div class="navbar-brand">
		<a id="left" class="navbar-item">
			<div class="has-text-left"><i id="licon" class="fas fa-times is-size-4"></i></div>
		</a>
		<a id="right" class="navbar-item">
			<div class="has-text-right"><i id="ricon" class="fas fa-check is-size-4"></i></div>
		</a>
	</div>
</nav>
<figure id="center" class="image is-64x64">
	<a>
		<img class="is-rounded" src="{{ asset('img/CenterLogo.png') }}" alt="MAP PIN" title="Take a Photo">
	</a>
</figure>
@endsection

@section('scripts')
<script src="{{ asset('js/modernizr-custom.js') }}"></script>
<script src="{{ asset('js/camera.js') }}"></script>
@endsection