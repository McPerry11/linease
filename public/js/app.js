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
		$('.title').text('');
		$('.pageloader').removeClass('is-active');
	});

	// Mobile Version
	$('.navbar-burger').click(function() {
		if ( $(this).hasClass('is-active') ) {
			$('.navbar-menu').slideToggle('fast', function() {
				$('.navbar-menu').removeClass('is-active');
			});
			$(this).removeClass('is-active').css({'color':'white', 'background-color':'#00C944'});
		} else {
			$(this).addClass('is-active');
			$('.navbar-menu').slideToggle('fast', function() {
				$('.navbar-menu').addClass('is-active');
			});
			$(this).css({'color':'#00C944', 'background-color':'white'});
		}
	});
});
