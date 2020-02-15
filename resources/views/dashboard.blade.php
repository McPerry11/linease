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
	<figure id="center" class="image is-64x64">
		<a>
			<img class="is-rounded" src="{{ asset('img/CenterLogo.png') }}" alt="MAP PIN">
		</a>
	</figure>
</div>
@endsection

@section('scripts')
{{-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcAzZeE0BXSxV_ILbrCgaInLxgeHWKG1k&callback=initMap" type="text/javascript"></script> --}}
<script src="{{ asset('js/navbar.js') }}"></script>
<script src="{{ asset('js/dashboard.js') }}"></script>
@endsection