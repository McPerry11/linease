$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
	}
});

$(window).on('load', function() {
	$('.title').text('');
	$('.pageloader').removeClass('is-active');
});

$(function() {
	// Mobile Version
	$('.navbar-burger').click(function() {
		$(this).toggleClass('is-active').css('color', function() {
			return $(this).hasClass('is-active') ? '#00C944' : 'white';
		}).css('background-color', function() {
			return $(this).hasClass('is-active') ? 'white' : '#00C944';
		});
		$('.navbar-menu').slideToggle('fast');
	});
});
