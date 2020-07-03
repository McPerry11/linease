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
		$('#nb-mobile').slideToggle('fast');
	});

	$('.navbar-item').click(function() {
		if ($(this).attr('id') == 'profile') {
			$('.navbar-link').toggleClass('navlink-inactive');
			$('#profile p').toggleClass('has-text-white').toggleClass('has-text-success');
			$('#profile .navbar-dropdown').slideToggle('fast', function() {
				$(this).toggleClass('is-active');
			});
		} else {
			var page = $(this).text();
			$('.title').text('Loading ' + page);
			$('.pageloader').addClass('is-active');
		}
	});
});
