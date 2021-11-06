@extends('_layout')

@section('styles')
<link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.15.0/maps/maps.css'>
<link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
@endsection

@section('body')
<div id="map-container">
	<div id="map"></div>
	<form id="search">
		<div class="field has-addons">
			<p class="control has-icons-left">
				<input class="input is-rounded" type="text" name="search" placeholder="Search Address, City, or District">
				<span class="icon is-left">
					<i class="image is-24x24">
						<img src="{{ asset('img/LineaseIcon.PNG') }}" alt="LinEase Pin">
					</i>
				</span>
			</p>
			<div class="control">
				<button type="submit" id="btn-search" class="button is-rounded" title="Search">
					<span class="icon">
						<i class="fas fa-search"></i>
					</span>
				</button>
			</div>
		</div>
	</form>
	<figure id="center" class="image is-64x64 is-hidden-desktop">
		<a href="{{ url('camera') }}">
			<img class="is-rounded" src="{{ asset('img/CenterLogo.png') }}" alt="MAP PIN">
		</a>
	</figure>
</div>
@endsection

@section('scripts')
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-vMsr2D_l6ODCXuHIGuBaZEsedlG7FVs&libraries=places&callback=initMap"></script>
<script src="{{ asset('js/dashboard.js') }}"></script>
@endsection