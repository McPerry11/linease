$(function() {
	// Universal
        $("html").removeClass("has-navbar-fixed-bottom");
        $("html").removeClass("has-navbar-fixed-top");

	$('form').submit(function() {
		$('#login').addClass('is-loading');
		$('#mlogin').addClass('is-loading');
		$('#register').attr('disabled', 'disabled');
		$('#mregister').attr('disabled', 'disabled');
	});


	// Desktop Version
	$('#view').click(function() {
		if( $('#password').attr('type') == 'password' ) {
			$('#password').attr('type', 'text');
			$('#icon-pass').removeClass('fa-eye');
			$('#icon-pass').addClass('fa-eye-slash');
			$('#icon-pass').addClass('has-text-white');
			$(this).removeClass('has-background-grey-lighter');
			$(this).addClass('has-background-grey-dark');
			$(this).addClass('is-selected');
		} else {
			$('#password').attr('type', 'password');
			$('#icon-pass').removeClass('fa-eye-slash');
			$('#icon-pass').addClass('fa-eye');
			$('#icon-pass').removeClass('has-text-white');
			$(this).removeClass('has-background-grey-dark');
			$(this).addClass('has-background-grey-lighter');
			$(this).removeClass('is-selected');
		}
	});

	$('#register').click(function() {
		$(this).addClass('is-loading');
		$(this).text('');
		$('#login').attr('disabled', 'disabled');
	});

	$('#username').keyup(function() {
		$('#message').text('');
	});

	$('#password').keyup(function() {
		$('#message').text('');
	})


	// Mobile Version
	$('#mview').click(function() {
		if( $('#mpassword').attr('type') == 'password' ) {
			$('#mpassword').attr('type', 'text');
			$('#micon-pass').removeClass('fa-eye');
			$('#micon-pass').addClass('fa-eye-slash');
			$('#micon-pass').addClass('has-text-white');
			$(this).removeClass('has-background-grey-lighter');
			$(this).addClass('has-background-grey-dark');
			$(this).addClass('is-selected');
		} else {
			$('#mpassword').attr('type', 'password');
			$('#micon-pass').removeClass('fa-eye-slash');
			$('#micon-pass').addClass('fa-eye');
			$('#micon-pass').removeClass('has-text-white');
			$(this).removeClass('has-background-grey-dark');
			$(this).addClass('has-background-grey-lighter');
			$(this).removeClass('is-selected');
		}
	});

	$('#mregister').click(function() {
		$(this).addClass('is-loading');
		$(this).text('');
		$('#mlogin').attr('disabled', 'disabled');
	});

	$('#musername').keyup(function() {
		$('#mmessage').text('');
	});

	$('#mpassword').keyup(function() {
		$('#mmessage').text('');
	});
});
