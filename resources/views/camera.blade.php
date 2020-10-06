@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/camera.css') }}">
<link rel="stylesheet" href="{{ asset('css/jquery-ui.min.css') }}">
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
@include('_modals')
@endsection

@section('scripts')
<script src="{{ asset('js/modernizr-custom.js') }}"></script>
<script src="{{ asset('js/camera.js') }}"></script>
<script src="{{ asset('js/jquery-ui.min.js') }}"></script>
<script>
	$('#left').click(function() {
		if ( $('#licon').hasClass('fa-times') ) {
			$('.pageloader').addClass('is-active');
			$('.title').text('Loading Dashboard');
			window.location.href = {{ route('dashboard') }};
		} else {
			camera();
			$('#licon').removeClass('fa-redo-alt').addClass('fa-times');
			$('#right').addClass('inactive');
		}
	});
</script>
@endsection