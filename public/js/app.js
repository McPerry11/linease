$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
	}
});

$(window).on('load', function() {
	if ($('#app').data('link') != 'camera' && $('#app').data('link') != '/') {
		$('.title').text('');
		$('.pageloader').removeClass('is-active');
	}
});

$(function() {
	var platform = window.matchMedia('only screen and (max-width: 768px)').matches ? 'm' : '';
	
	$(window).resize(function() {
		let newplatform = window.matchMedia('only screen and (max-width: 768px)').matches ? 'm' : '';
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
		$('.pageloader .title').text('Loading Dashboard');
		$('.pageloader').addClass('is-active');
	});
});
