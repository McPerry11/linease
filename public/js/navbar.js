$(function() {
	// Mobile Version
	$('.navbar-burger').click(function() {
		if ( $(this).hasClass('is-active') ) {
			$('.navbar-menu').slideToggle('fast', function() {
				$('.navbar-menu').removeClass('is-active');
			});
			$(this).removeClass('is-active');
			$(this).css({'color':'white', 'background-color':'#00C944'});
		} else {
			$(this).addClass('is-active');
			$('.navbar-menu').slideToggle('fast', function() {
				$('.navbar-menu').addClass('is-active');
			});
			$(this).css({'color':'#00C944', 'background-color':'white'});
		}
	});
});