$(function() {
	function validate(check) {
		console.log(check);
		$('#create').removeAttr('disabled');
		for (var i = 0; i < check.length; i++) {
			if (check[i] == false) {
				$('#create').attr('disabled', 'disabled');
				break;
			}
		}
	}

	var error = [true, true, true];

	$('#username').change(function() {
		var username = $(this).val();
		if (username.trim() == "") {
			$(this).removeClass('is-success');
			$(this).addClass('is-danger');
			$('#user-icon').removeClass('has-text-success');
			$('#user-icon').addClass('has-text-danger');
			$('#user-warning').text('Username cannot be empty');
			$('#create').attr('disabled', 'disabled');
			error[0] = false;
		} else {
			$('#user-control').addClass('is-loading');
			$('#create').attr('disabled', 'disabled');
			$.ajax({
				type: 'POST',
				url: 'users',
				data: {username:username, data:'username', source:'registration'},
				datatype: 'JSON',
				success: function(data) {
					if (data.status == 'error') {
						$('#user-warning').text(data.msg);
						$('#username').removeClass('is-success');
						$('#username').addClass('is-danger');
						$('#user-icon').removeClass('has-text-success');
						$('#user-icon').addClass('has-text-danger');
						error[0] = false;
					} else {
						$('#username').removeClass('is-danger');
						$('#username').addClass('is-success');
						$('#user-icon').removeClass('has-text-danger');
						$('#user-icon').addClass('has-text-success');
						error[0] = true;
					}
				},
				error: function() {
					error[0] = true;
					$('#create').removeAttr('disabled');
					$('#user-control').removeClass('is-loading');
					alert('Something went wrong. Please try again later.');
				}
			}).then(function() {
				$('#user-control').removeClass('is-loading');
				validate(error);
			});
		}
	});

	$('#username').keyup(function() {
		$('#user-warning').text('');
		$(this).removeClass('is-success');
		$(this).removeClass('is-danger');
		$('#user-icon').removeClass('has-text-success');
		$('#user-icon').removeClass('has-text-danger');
		error[0] = true;
		validate(error);
	});

	$('#email').change(function() {
		var email = $(this).val();
		if (email.trim() == '') {
			$(this).removeClass('is-success');
			$(this).addClass('is-danger');
			$('#email-icon').removeClass('has-text-success');
			$('#email-icon').addClass('has-text-danger');
			$('#email-warning').text('Email Address cannot be empty');
			$('#create').attr('disabled', 'disabled');
			error[1] = false;
		} else {
			$('#email-control').addClass('is-loading');
			$('#create').attr('disabled', 'disabled');
			$.ajax({
				type: 'POST',
				url: 'users',
				data: {email:email, data:'email', source:'registration'},
				success: function(data) {
					if (data.status == 'error') {
						$('#email-warning').text(data.msg);
						$('#email').removeClass('is-success');
						$('#email').addClass('is-danger');
						$('#email-icon').removeClass('has-text-success');
						$('#email-icon').addClass('has-text-danger');
						error[1] = false;
					} else {
						$('#email').removeClass('is-danger');
						$('#email').addClass('is-success');
						$('#email-icon').removeClass('has-text-danger');
						$('#email-icon').addClass('has-text-success');
						error[1] = true;
					}
				},
				error: function() {
					error[1] = true;
					$('#email-control').removeClass('is-loading');
					alert('Something went wrong. Please try again later.');
				}
			}).then(function() {
				$('#email-control').removeClass('is-loading');
				validate(error);
			});
		}
	});

	$('#email').keyup(function() {
		$('#email-warning').text('');
		$('#email').removeClass('is-success');
		$('#email').removeClass('is-danger');
		$('#email-icon').removeClass('has-text-success');
		$('#email-icon').removeClass('has-text-danger');
		error[1] = true;
		validate(error);
	});

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

	$('#password').change(function() {
		var pass = $(this).val();
		var confirm = $('#cpass').val();
		if (confirm.trim() != "") {
			if (pass == confirm) {
				$(this).removeClass('is-danger');
				$(this).addClass('is-success');
				$('#pass-icon').removeClass('has-text-danger');
				$('#pass-icon').addClass('has-text-success');
				$('#cpass').removeClass('is-danger');
				$('#cpass').addClass('is-success');
				$('#cpass-icon').removeClass('has-text-danger');
				$('#cpass-icon').addClass('has-text-success');
				error[2] = true;
			} else {
				$('#cpass-warning').text('Passwords do not match');
				$(this).removeClass('is-success');
				$(this).addClass('is-danger');
				$('#pass-icon').removeClass('has-text-success');
				$('#pass-icon').addClass('has-text-danger');
				$('#cpass').removeClass('is-success');
				$('#cpass').addClass('is-danger');
				$('#cpass-icon').removeClass('has-text-success');
				$('#cpass-icon').addClass('has-text-danger');
				error[2] = false;
			}
		}
		validate(error);
	});

	$('#password').keyup(function() {
		$('#cpass-warning').text('');
		error[2] = true;
		validate(error);
	});

	$('#cpass').change(function() {
		var pass = $('#password').val();
		var confirm = $(this).val();
		if (pass == confirm) {
			$('#password').removeClass('is-danger');
			$('#password').addClass('is-success');
			$('#pass-icon').removeClass('has-text-danger');
			$('#pass-icon').addClass('has-text-success');
			$(this).removeClass('is-danger');
			$(this).addClass('is-success');
			$('#cpass-icon').removeClass('has-text-danger');
			$('#cpass-icon').addClass('has-text-success');
			error[2] = true
		} else {
			$('#cpass-warning').text('Passwords do not match');
			$('#password').removeClass('is-success');
			$('#password').addClass('is-danger');
			$('#pass-icon').removeClass('has-text-success');
			$('#pass-icon').addClass('has-text-danger');
			$(this).removeClass('is-success');
			$(this).addClass('is-danger');
			$('#cpass-icon').removeClass('has-text-success');
			$('#cpass-icon').addClass('has-text-danger');
			error[2] = false;
		}
		validate(error);
	});

	$('#cpass').keyup(function() {
		$('#cpass-warning').text('');
		$('#password').removeClass('is-success');
		$('#password').removeClass('is-danger');
		$('#pass-icon').removeClass('has-text-success');
		$('#pass-icon').removeClass('has-text-danger');
		$(this).removeClass('is-success');
		$(this).removeClass('is-danger');
		$('#cpass-icon').removeClass('has-text-success');
		$('#cpass-icon').removeClass('has-text-danger');
		error[2] = true;
		validate(error);
	});

	$('form').submit(function() {
		$('#create').addClass('is-loading');
	});
});