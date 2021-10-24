$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
	}
});

<<<<<<< HEAD
// if (window.location.pathname != '/linease/public/' && window.location.pathname != '/linease-web/public/' && window.location.pathname != '/linease/') {
	$(window).on('load', function() {
		$('.title').text('');
		$('.pageloader').removeClass('is-active');
	});
// }
=======
$(window).on('load', function() {
	$('.title').text('');
	$('.pageloader').removeClass('is-active');
});
>>>>>>> MCbranch

$(function() {
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
