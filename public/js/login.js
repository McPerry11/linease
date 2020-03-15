$(function() {
	// Univeral
	$('html').removeClass('has-navbar-fixed-bottom').removeClass('has-navbar-fixed-top');
	$('.pageloader').removeClass('is-active');

	$('form').submit(function(e) {
		e.preventDefault();
		var username, password;
		$('#login').addClass('is-loading');
		$('#mlogin').addClass('is-loading');
		$('#register').attr('disabled', 'disabled');
		$('#mregister').attr('disabled', 'disabled');
		if ($('#username').val()) {
			username = $('#username').val();
			password = $('#password').val();
		} else {
			username = $('#musername').val();
			password = $('#mpassword').val();
		}

		$.ajax({
			type: 'POST',
			url: 'login',
			data: {username:username, password:password},
			datatype: 'JSON',
			success: function(response) {
				$('#login').removeClass('is-loading');
				$('#mlogin').removeClass('is-loading');
				$('#register').removeAttr('disabled');
				$('#mregister').removeAttr('disabled');
				if (response.status == 'success') {
					Swal.fire({
						type: 'success',
						title: response.message,
						showConfirmButton: false,
						timer: 2500,
					}).then(function() {
						$('.title').text('Loading Dashboard');
						$('.pageloader').addClass('is-active');
						window.location.href = "/linease-alpha/public";
						// Server
						// window.location.href = "/linease-alpha";
					});
				} else if (response.status == 'error') {
					$('#message').text(response.message);
					$('#mmessage').text(response.message);
					$('#password').val('');
					$('#mpassword').val('');
					$('#username').val('');
					$('#musername').val('');
				}
			},
			error: function(err) {
				console.log(err);
				$('#login').removeClass('is-loading');
				$('#mlogin').removeClass('is-loading');
				$('#register').removeAttr('disabled');
				$('#mregister').removeAttr('disabled');
				Swal.fire({
					type: 'error',
					title: 'Cannot Log In to LinEase',
					text: 'Something went wrong. Please try again later.',
				});
			}
		});
	});

	$('a.has-text-success').click(function() {
		$('.title').text('Loading Registration');
		$('.pageloader').addClass('is-active');
	});

	$('.delete').click(function() {
		$('.notification').fadeOut();
		setTimeout(function() {
			$('.notification').remove();
		}, 1000);
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
