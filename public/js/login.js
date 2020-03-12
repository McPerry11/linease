$(function() {
	// Univeral
	$('html').removeClass('has-navbar-fixed-bottom').removeClass('has-navbar-fixed-top');
	$('.pageloader').removeClass('is-active');

	$('form').submit(function() {
		$('#login').addClass('is-loading');
		$('#mlogin').addClass('is-loading');
		$('#register').attr('disabled', 'disabled');
		$('#mregister').attr('disabled', 'disabled');
	});

	$('a.has-text-success').click(function() {
		$('.title').text('Loading Registration');
		$('.pageloader').addClass('is-active');
	});


	// Desktop Version
	$('#view').click(function() {
		if( $('#password').attr('type') == 'password' ) {
			$('#password').attr('type', 'text');
			$('#icon-pass').removeClass('fa-eye').addClass('fa-eye-slash').addClass('has-text-white');
			$(this).removeClass('has-background-grey-lighter').addClass('has-background-grey-dark').addClass('is-selected');
		} else {
			$('#password').attr('type', 'password');
			$('#icon-pass').removeClass('fa-eye-slash').addClass('fa-eye').removeClass('has-text-white');
			$(this).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter').removeClass('is-selected');
		}
	});

	$('#register').click(function() {
		var attr = $('#register').attr('disabled');
		if (typeof attr !== typeof undefined && attr !== false) {
			return false;
		}
		$('.title').text('Loading Registration');
		$('.pageloader').addClass('is-active');
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
			$('#micon-pass').removeClass('fa-eye').addClass('fa-eye-slash').addClass('has-text-white');
			$(this).removeClass('has-background-grey-lighter').addClass('has-background-grey-dark').addClass('is-selected');
		} else {
			$('#mpassword').attr('type', 'password');
			$('#micon-pass').removeClass('fa-eye-slash').addClass('fa-eye').removeClass('has-text-white');
			$(this).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter').removeClass('is-selected');
		}
	});

	$('#mregister').click(function(e) {
		var attr = $('#mregister').attr('disabled');
		if (typeof attr !== typeof undefined && attr !== false) {
			return false;
		}
		$('.title').text('Loading Registration');
		$('.pageloader').addClass('is-active');
	});

	$('#musername').keyup(function() {
		$('#mmessage').text('');
	});

	$('#mpassword').keyup(function() {
		$('#mmessage').text('');
	});
});
