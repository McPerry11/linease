@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/jquery-ui.min.css') }}">
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
<figure id="center" class="image is-64x64 active">
	<a>
		<img class="is-rounded" src="{{ asset('img/CenterLogo.png') }}" alt="MAP PIN" title="Take a Photo">
	</a>
</figure>

<div id="createReport" class="modal is-success">
	<div class="modal-background"></div>
	<div class="modal-card">
		<section class="modal-card-body">
			<span id="loader" class="icon is-large has-text-white">
				<i class="fas fa-circle-notch fa-spin fa-3x"></i>
			</span>
			<form class="is-hidden">
				@csrf
				<figure class="image is-1x1">
					<img src="" alt="" id="preview">
				</figure>
				<div class="field">
					<div class="control">
						<label>LATITUDE</label>
						<input id="lat" class="input has-text-grey" type="number" name="lat" readonly>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label>LONGITUDE</label>
						<input id="lng" class="input has-text-grey" type="text" name="long" readonly>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label>ADDRESS</label>
						<textarea id="address" rows="3" class="textarea has-text-grey" name="description" readonly></textarea>
						<small class="help">Latitude, Longitude, and Address cannot be edited.</small>
					</div>
				</div>
				<div class="field">
					<label>SEVERITY</label>
					<div class="control has-icons-left">
						<div class="select">
							<select id="severity" name="severity">
								<option value="" data-class="avatar" data-img="S1Label.png" data-style="background-image:url('img/S1Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Critical</option>
								<option value="" data-class="avatar" data-img="S2Label.png" data-style="background-image:url('img/S2Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Major</option>
								<option value="" data-class="avatar" data-img="S3Label.png" data-style="background-image:url('img/S3Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Moderate</option>
								<option value="" data-class="avatar" data-img="S4Label.png" data-style="background-image:url('img/S4Label.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Light</option>
								{{-- <option value="" data-class="avatar" data-img="RLabel.png" data-style="background-image:url('img/RLabel.png'); background-size:contain; background-position:center; height:20px; width:20px; border-radius:50%;">Hello World</option> --}}
							</select>
						</div>
						<div class="icon is-left">
							<figure class="image is-32x32">
								<img src="" alt="" class="is-rounded">
							</figure>
						</div>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label>DESCRIPTION</label>
						<textarea id="description" rows="5" class="textarea" name="description"></textarea>
					</div>
				</div>
				<div class="buttons is-centered mt-5">
					<button id="cancel" class="button is-pulled-right is-white is-outlined" type="button">CANCEL</button>
					<button id="submit" class="button is-pulled-right is-white has-text-success" type="submit">SUBMIT</button>
				</div>
			</form>
		</section>
	</div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/modernizr-custom.js') }}"></script>
<script src="{{ asset('js/camera.js') }}" id="camjs" data-link="{{ route('dashboard') }}"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-vMsr2D_l6ODCXuHIGuBaZEsedlG7FVs&libraries=places&callback=initMap"></script>
<script src="{{ asset('js/jquery-ui.min.js') }}"></script>
@endsection