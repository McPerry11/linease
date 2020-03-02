$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
	}
});

$(function() {
	$('.pageloader').addClass('is-active');
	$(window).on('load', function() {
		$('.pageloader').removeClass('is-active');
	});
});