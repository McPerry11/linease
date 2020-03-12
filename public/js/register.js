$(function() {
	// Universal
	$('html').removeClass('has-navbar-fixed-bottom').removeClass('has-navbar-fixed-top');
	$('.pageloader').removeClass('is-active');

	var error = [true, true, true];

	function validateUsername(username) {
		var expr = /^[a-zA-Z0-9._]*$/;
		if (!expr.test(username)) {
			return false;
		} else {
			return true;
		}
	}

	function validate(check) {
		$('#create').removeAttr('disabled');
		$('#mcreate').removeAttr('disabled');
		for (var i = 0; i < check.length; i++) {
			if (check[i] == false) {
				$('#create').attr('disabled', 'disabled');
				$('#mcreate').attr('disabled', 'disabled');
				break;
			}
		}
	}

	function validatePassword(pass, confirm) {
		if (pass == confirm) {
			$('#password').removeClass('is-danger').addClass('is-success');
			$('#pass-icon').removeClass('has-text-danger').addClass('has-text-success');
			$("#cpass").removeClass('is-danger').addClass('is-success');
			$('#cpass-icon').removeClass('has-text-danger').addClass('has-text-success');
			$('#mpassword').removeClass('is-danger').addClass('is-success');
			$('#mpass-icon').removeClass('has-text-danger').addClass('has-text-success');
			$("#mcpass").removeClass('is-danger').addClass('is-success');
			$('#mcpass-icon').removeClass('has-text-danger').addClass('has-text-success');
			error[2] = true
		} else {
			$('#cpass-warning').text('Passwords do not match');
			$('#password').removeClass('is-success').addClass('is-danger');
			$('#pass-icon').removeClass('has-text-success').addClass('has-text-danger');
			$("#cpass").removeClass('is-success').addClass('is-danger');
			$('#cpass-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#mcpass-warning').text('Passwords do not match');
			$('#mpassword').removeClass('is-success').addClass('is-danger');
			$('#mpass-icon').removeClass('has-text-success').addClass('has-text-danger');
			$("#mcpass").removeClass('is-success').addClass('is-danger');
			$('#mcpass-icon').removeClass('has-text-success').addClass('has-text-danger');
			error[2] = false;
		}
		validate(error);
	}

	$('form').submit(function() {
		$('#create').addClass('is-loading');
		$('#mcreate').addClass('is-loading');
	});

	$('a.has-text-success').click(function() {
		$('.title').text('Loading Login Module');
		$('.pageloader').addClass('is-active');
	});


	// Desktop Version
	$('#username').focusout(function() {
		var username = $(this).val();
		if (username.trim() == "") {
			$(this).removeClass('is-success').addClass('is-danger');
			$('#user-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#user-warning').text('Username cannot be empty');
			$('#create').attr('disabled', 'disabled');
			error[0] = false;
		} else {
			$('#user-control').addClass('is-loading');
			$('#create').attr('disabled', 'disabled');
			var valid_uname = validateUsername(username);
			if (valid_uname) {
				$.ajax({
					type: 'POST',
					url: 'users',
					data: {username:username, data:'username', source:'registration'},
					datatype: 'JSON',
					success: function(data) {
						if (data.status == 'error') {
							$('#user-warning').text(data.msg);
							$('#username').removeClass('is-success').addClass('is-danger');
							$('#user-icon').removeClass('has-text-success').addClass('has-text-danger');
							error[0] = false;
						} else {
							$('#user-warning').text('');
							$('#username').removeClass('is-danger').addClass('is-success');
							$('#user-icon').removeClass('has-text-danger').addClass('has-text-success');
							error[0] = true;
						}
					},
					error: function(err) {
						console.log(err);
						error[0] = false;
						$('#user-control').removeClass('is-loading');
						alert('Something went wrong. Please try again later.');
					}
				}).then(function() {
					$('#user-control').removeClass('is-loading');
					validate(error);
				});
			} else {
				$(this).removeClass('is-success');
				$(this).addClass('is-danger');
				$('#user-icon').removeClass('has-text-success').addClass('has-text-danger');
				$('#user-control').removeClass('is-loading');
				$('#user-warning').text('Special characters except . and _ are not allowed');
				$('#create').attr('disabled', 'disabled');
				error[0] = false;
				validate(error);
			}
		}
	});

	$('#username').keyup(function(e) {
		if (e.which || e.keyCode !== 9) {
			$('#user-warning').text('');
			$(this).removeClass('is-success');
			$(this).removeClass('is-danger');
			$('#user-icon').removeClass('has-text-success').removeClass('has-text-danger');
			error[0] = true;
			validate(error);
		}
	});

	$('#email').focusout(function() {
		var email = $(this).val();
		if (email.trim() == '') {
			$(this).removeClass('is-success');
			$(this).addClass('is-danger');
			$('#email-icon').removeClass('has-text-success').addClass('has-text-danger');
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
						$('#email').removeClass('is-success').addClass('is-danger');
						$('#email-icon').removeClass('has-text-success').addClass('has-text-danger');
						error[1] = false;
					} else {
						$('#email-warning').text('');
						$('#email').removeClass('is-danger').addClass('is-success');
						$('#email-icon').removeClass('has-text-danger').addClass('has-text-success');
						error[1] = true;
					}
				},
				error: function(err) {
					console.log(err);
					error[1] = false;
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
		$(this).removeClass('is-success').removeClass('is-danger');
		$('#email-icon').removeClass('has-text-success').removeClass('has-text-danger');
		error[1] = true;
		validate(error);
	});

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

	$('#password').focusout(function() {
		var pass = $(this).val();
		var confirm = $('#cpass').val();
		if (pass.length >= 8) {
			$(this).removeClass('is-danger');
			$('#pass-warning').text('');
			$('#create').removeAttr('disabled');
			if (confirm.trim() != "") {
				validatePassword(pass, confirm);
			}
			validate(error);
		} else {
			$(this).addClass('is-danger');
			$('#create').attr('disabled', 'disabled');
			$('#pass-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#cpass').removeClass('is-success').addClass('is-danger');
			$('#cpass-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#pass-warning').text('Password must be a minimum length of 8');
		}
	});

	$('#password').keyup(function() {
		$('#pass-warning').text('');
		$('#cpass-warning').text('');
		$(this).removeClass('is-danger');
		$('#cpass').removeClass('is-danger');
		$('#pass-icon').removeClass('has-text-danger');
		$('#cpass-icon').removeClass('has-text-danger');
		error[2] = true;
		validate(error);
	});

	$('#cpass').focusout(function() {
		var pass = $('#password').val();
		var confirm = $(this).val();
		if (pass.length >= 8) {
			validatePassword(pass, confirm);
		}
	});

	$('#cpass').keyup(function() {
		var pass = $('#password').val();
		if (pass.length >= 8) {
			$('#cpass-warning').text('');
			$('#password').removeClass('is-success').removeClass('is-danger');
			$('#pass-icon').removeClass('has-text-success').removeClass('has-text-danger');
			$(this).removeClass('is-success').removeClass('is-danger');
			$('#cpass-icon').removeClass('has-text-success').removeClass('has-text-danger');
			error[2] = true;
			validate(error);
		}
	});


	// Mobile Version
	$('#musername').focusout(function() {
		var username = $(this).val();
		if (username.trim() == "") {
			$(this).removeClass('is-success').addClass('is-danger');
			$('#muser-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#muser-warning').text('Username cannot be empty');
			$('#mcreate').attr('disabled', 'disabled');
			error[0] = false;
		} else {
			$('#muser-control').addClass('is-loading');
			$('#mcreate').attr('disabled', 'disabled');
			var valid_uname = validateUsername(username);
			if (valid_uname) {
				$.ajax({
					type: 'POST',
					url: 'users',
					data: {username:username, data:'username', source:'registration'},
					datatype: 'JSON',
					success: function(data) {
						if (data.status == 'error') {
							$('#muser-warning').text(data.msg);
							$('#musername').removeClass('is-success').addClass('is-danger');
							$('#muser-icon').removeClass('has-text-success').addClass('has-text-danger');
							error[0] = false;
						} else {
							$('#muser-warning').text('');
							$('#musername').removeClass('is-danger').addClass('is-success');
							$('#muser-icon').removeClass('has-text-danger').addClass('has-text-success');
							error[0] = true;
						}
					},
					error: function(err) {
						console.log(err);
						error[0] = false;
						$('#muser-control').removeClass('is-loading');
						alert('Something went wrong. Please try again later.');
					}
				}).then(function() {
					$('#muser-control').removeClass('is-loading');
					validate(error);
				});
			} else {
				$(this).removeClass('is-success').addClass('is-danger');
				$('#muser-icon').removeClass('has-text-success').addClass('has-text-danger');
				$('#muser-control').removeClass('is-loading');
				$('#muser-warning').text('Special characters except . and _ are not allowed');
				$('#mcreate').attr('disabled', 'disabled');
				error[0] = false;
				validate(error);
			}
		}
	});

	$('#musername').keyup(function(e) {
		if (e.which || e.keyCode !== 9) {
			$('#muser-warning').text('');
			$(this).removeClass('is-success').removeClass('is-danger');
			$('#muser-icon').removeClass('has-text-success').removeClass('has-text-danger');
			error[0] = true;
			validate(error);
		}
	});

	$('#memail').focusout(function() {
		var email = $(this).val();
		if (email.trim() == '') {
			$(this).removeClass('is-success').addClass('is-danger');
			$('#memail-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#memail-warning').text('Email Address cannot be empty');
			$('#mcreate').attr('disabled', 'disabled');
			error[1] = false;
		} else {
			$('#memail-control').addClass('is-loading');
			$('#mcreate').attr('disabled', 'disabled');
			$.ajax({
				type: 'POST',
				url: 'users',
				data: {email:email, data:'email', source:'registration'},
				success: function(data) {
					if (data.status == 'error') {
						$('#memail-warning').text(data.msg);
						$('#memail').removeClass('is-success').addClass('is-danger');
						$('#memail-icon').removeClass('has-text-success').addClass('has-text-danger');
						error[1] = false;
					} else {
						$('#memail-warning').text('');
						$('#memail').removeClass('is-danger').addClass('is-success');
						$('#memail-icon').removeClass('has-text-danger').addClass('has-text-success');
						error[1] = true;
					}
				},
				error: function(err) {
					console.log(err);
					error[1] = false;
					$('#memail-control').removeClass('is-loading');
					alert('Something went wrong. Please try again later.');
				}
			}).then(function() {
				$('#memail-control').removeClass('is-loading');
				validate(error);
			});
		}
	});

	$('#memail').keyup(function(e) {
		$('#memail-warning').text('');
		$('#memail').removeClass('is-success').removeClass('is-danger');
		$('#memail-icon').removeClass('has-text-success').removeClass('has-text-danger');
		error[1] = true;
		validate(error);
	});

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

	$('#mpassword').focusout(function() {
		var pass = $(this).val();
		var confirm = $('#mcpass').val();
		if (pass.length >= 8) {
			$(this).removeClass('is-danger');
			$('#mpass-warning').text('');
			$('#mcreate').removeAttr('disabled');
			if (confirm.trim() != "") {
				validatePassword(pass, confirm);
			}
			validate(error);
		} else {
			$(this).addClass('is-danger');
			$('#mcreate').attr('disabled', 'disabled');
			$('#mpass-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#mcpass').removeClass('is-success').addClass('is-danger');
			$('#mcpass-icon').removeClass('has-text-success').addClass('has-text-danger');
			$('#mpass-warning').text('Password must be a minimum length of 8');
		}
	});

	$('#mpassword').keyup(function() {
		$('#mpass-warning').text('');
		$('#mcpass-warning').text('');
		$(this).removeClass('is-danger');
		$('#mcpass').removeClass('is-danger');
		$('#mpass-icon').removeClass('has-text-danger');
		$('#mcpass-icon').removeClass('has-text-danger');
		error[2] = true;
		validate(error);
	});

	$('#mcpass').focusout(function() {
		var pass = $('#mpassword').val();
		var confirm = $(this).val();
		if (pass.length >= 8) {
			validatePassword(pass, confirm);
		}
	});

	$('#mcpass').keyup(function() {
		var pass = $('#mpassword').val();
		if (pass.length >= 8) {
			$('#mcpass-warning').text('');
			$('#mpassword').removeClass('is-success').removeClass('is-danger');
			$('#mpass-icon').removeClass('has-text-success').removeClass('has-text-danger');
			$(this).removeClass('is-success').removeClass('is-danger');
			$('#mcpass-icon').removeClass('has-text-success').removeClass('has-text-danger');
			error[2] = true;
			validate(error);
		}
	});
});
