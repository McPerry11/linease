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
	$('.navbar-burger').click(function() {
		$(this).toggleClass('is-active').css('color', function() {
			return $(this).hasClass('is-active') ? '#00C944' : 'white';
		}).css('background-color', function() {
			return $(this).hasClass('is-active') ? 'white' : '#00C944';
		});
		$('#nb-mobile').slideToggle('fast');
	});

	$('.navbar-menu .navbar-item').click(function() {
		if ($(this).data('id') == 'logout') {
			$('#logout').submit();
		} else {
			var page = $(this).text();
			$('.title').text('Loading ' + page);
			$('.pageloader').addClass('is-active');
		}
	});

	$('#back').click(function() {
		$('.pageloader .title').text('Loading Dashboard');
		$('.pageloader').addClass('is-active');
	});
});
