$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
	}
});

$(function() {
	document.body.requestFullscreen();
	$(window).on('load', function() {
		$('.pageloader').removeClass('is-active');
	});
});
