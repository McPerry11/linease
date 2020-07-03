@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/navbar.css') }}">
<link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
@endsection

@section('body')
<div id="map-container">
	<div id="map"></div>
	<div id="legend"></div>
	<form>
		<div class="field has-addons">
			<p class="control has-icons-left">
				<input id="search" class="input is-rounded" type="text" name="search" placeholder="Search Address, City, or District">
				<span class="icon is-left">
					<i class="image is-24x24">
						<img src="{{ asset('img/LineaseIcon.PNG') }}" alt="LinEase Pin">
					</i>
				</span>
			</p>
			<div class="control">
				<button type="submit" id="btn-search" class="button is-rounded" title="Search"><i class="fas fa-search"></i></button>
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
<script src="{{ asset('js/dashboard.js') }}"></script>
{{-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcAzZeE0BXSxV_ILbrCgaInLxgeHWKG1k&callback=initMap" type="text/javascript"></script> --}}
@endsection