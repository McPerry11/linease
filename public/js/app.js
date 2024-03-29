$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
	}
});

window.oncontextmenu = function(event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
};

$(window).on('load', function() {
	if (['login', 'register', 'desktop', 'not_found'].includes($('#app').data('link'))) {
		$('.title').text('');
		$('.pageloader').removeClass('is-active');
	}
});

$(function() {
	var platform = window.matchMedia('only screen and (max-width: 1023px)').matches ? 'm' : '';
	
	$(window).resize(function() {
		let newplatform = window.matchMedia('only screen and (max-width: 1023px)').matches ? 'm' : '';
		if (newplatform != platform) {
			$('.title').text('Reloading Viewport');
			$('.pageloader').addClass('is-active');
			location.reload();
		}
	});

	$('.navbar-burger').click(function() {
		$(this).toggleClass('is-active').css('color', function() {
			return $(this).hasClass('is-active') ? '#00C944' : 'white';
		}).css('background-color', function() {
			return $(this).hasClass('is-active') ? 'white' : '#00C944';
		});
		$('#nb-mobile').slideToggle('fast');
	});

	$('#back').click(function() {
		$('.title').text('Loading Dashboard');
		$('.pageloader').addClass('is-active');
	});
});
