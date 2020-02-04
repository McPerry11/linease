$(function() {
	$('.view').click(function() {
		if( $('.password').attr('type') == 'password' ) {
			$('.password').attr('type', 'text');
			$('#icon-pass').removeClass('fa-eye');
			$('#icon-pass').addClass('fa-eye-slash');
			$('#icon-pass').addClass('has-text-white');
			$(this).removeClass('has-background-grey-lighter');
			$(this).addClass('has-background-grey-dark');
			$(this).addClass('is-selected');
		} else {
			$('.password').attr('type', 'password');
			$('#icon-pass').removeClass('fa-eye-slash');
			$('#icon-pass').addClass('fa-eye');
			$('#icon-pass').removeClass('has-text-white');
			$(this).removeClass('has-background-grey-dark');
			$(this).addClass('has-background-grey-lighter');
			$(this).removeClass('is-selected');
		}
	});

	$('form').submit(function() {
		$('#login').addClass('is-loading');
		$('#mlogin').addClass('is-loading');
		$('#register').attr('disabled', 'disabled');
		$('#mregister').attr('disabled', 'disabled');
	});

	$('#register').click(function() {
		$(this).addClass('is-loading');
		$(this).text('');
		$('#login').attr('disabled', 'disabled');
	});

	$('#mregister').click(function() {
		$(this).addClass('is-loading');
		$(this).text('');
		$('#mlogin').attr('disabled', 'disabled');
	});

	$('.password').keypress(function() {
		$('#message').text('');
	})
});