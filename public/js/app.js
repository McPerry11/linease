$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
	}
});

$(function() {
	// let isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;
	// if (isMobile) {
	// 	document.body.requestFullscreen();
	// }
	$(window).on('load', function() {
		$('.pageloader').removeClass('is-active');
	});
});
