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
	<figure id="center" class="image is-64x64 is-hidden-desktop" data-valid="{{ $user->verified }}" data-profile="{{ url($user->username) }}" data-camera="{{ url('camera') }}">
		<img class="is-rounded" src="{{ asset('img/CenterLogo.png') }}" alt="MAP PIN">
	</figure>
</div>

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
					<img src="" alt="" data-base="{{ asset('reports') }}">
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
<script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>
<script id="dashboard" src="{{ asset('js/dashboard.js') }}" data-link="{{ asset('img') }}" data-expire="{{ route('login') }}"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-vMsr2D_l6ODCXuHIGuBaZEsedlG7FVs&libraries=places&callback=initMap"></script>
@endsection