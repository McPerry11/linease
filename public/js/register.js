$(function() {
	function serverErr(error) {
		console.log(error);
		Swal.fire({
			type: 'error',
			title: 'Cannot connect to server',
			text: 'Something went wrong. Please try again later.'
		});
	}

	function validate(check) {
		$(btnCreate).removeAttr('disabled');
		for (let i = 0; i < check.length; i++) {
			if (check[i]) {
				$(btnCreate).attr('disabled', 'disabled');
				break;
			}
		}
	}

	function validateUsername(username) {
		let expr = /^[a-zA-Z0-9._]*$/;
		if (!expr.test(username)) {
			return false;
		} else {
			return true;
		}
	}

	function validateEmail(email) {
		let expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!expr.test(email)) {
			return false;
		} else {
			return true;
		}
	}

	function clearResponse(warning, textbox, icon, seq) {
		$(warning).text('');
		$(textbox).removeClass('is-success').removeClass('is-danger');
		$(icon).removeClass('has-text-success').removeClass('has-text-danger');
		error[seq] = false;
		validate(error);
	}

	// function checkInputs(input, textbox, icon, warning, warnMsg, valid, invalidMsg) {

	// }

	// function validatePassword(pass, confirm) {
	// 	if (pass == confirm) {
	// 		$('#password').removeClass('is-danger').addClass('is-success');
	// 		$('#pass-icon').removeClass('has-text-danger').addClass('has-text-success');
	// 		$("#cpass").removeClass('is-danger').addClass('is-success');
	// 		$('#cpass-icon').removeClass('has-text-danger').addClass('has-text-success');
	// 		$('#mpassword').removeClass('is-danger').addClass('is-success');
	// 		$('#mpass-icon').removeClass('has-text-danger').addClass('has-text-success');
	// 		$("#mcpass").removeClass('is-danger').addClass('is-success');
	// 		$('#mcpass-icon').removeClass('has-text-danger').addClass('has-text-success');
	// 		error[2] = true
	// 	} else {
	// 		$('#cpass-warning').text('Passwords do not match');
	// 		$('#password').removeClass('is-success').addClass('is-danger');
	// 		$('#pass-icon').removeClass('has-text-success').addClass('has-text-danger');
	// 		$("#cpass").removeClass('is-success').addClass('is-danger');
	// 		$('#cpass-icon').removeClass('has-text-success').addClass('has-text-danger');
	// 		$('#mcpass-warning').text('Passwords do not match');
	// 		$('#mpassword').removeClass('is-success').addClass('is-danger');
	// 		$('#mpass-icon').removeClass('has-text-success').addClass('has-text-danger');
	// 		$("#mcpass").removeClass('is-success').addClass('is-danger');
	// 		$('#mcpass-icon').removeClass('has-text-success').addClass('has-text-danger');
	// 		error[2] = false;
	// 	}
	// 	validate(error);
	// }

	var error = [false, false, false], platform = '', isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;
	if (isMobile) {
		platform = 'm';
	}
	var btnCreate = '#' + platform + 'create';
	var inpUsername = '#' + platform + 'username', icnUsername = '#' + platform + 'user-icon', txtUserWarning = '#' + platform + 'user-warning', inpUserControl = '#' + platform + 'user-control';
	var inpEmail = '#' + platform + 'email', icnEmail = '#' + platform + 'email-icon', txtEmailWarning = '#' + platform + 'email-warning', inpEmailControl = '#' + platform + 'email-control';

	$('html').removeClass('has-navbar-fixed-bottom').removeClass('has-navbar-fixed-top');
	$('.pageloader').removeClass('is-active');

	$('form').submit(function() {
		$(btnCreate).addClass('is-loading');
	});

	$('#' + platform + 'login').click(function(e) {
		if ($(btnCreate).hasClass('is-loading')) {
			e.preventDefault();
		} else {
			$('.title').text('Loading Login');
			$('.pageloader').addClass('is-active');
		}
	});

	$(inpUsername).focusout(function() {
		var username = $(this).val(), valid_uname = validateUsername(username);
		if (username.trim() == "") {
			$(this).removeClass('is-success').addClass('is-danger');
			$(icnUsername).removeClass('has-text-success').addClass('has-text-danger');
			$(txtUserWarning).text('Username cannot be empty');
			error[0] = true;
			validate(error);
		} else if (!valid_uname) {
			$(this).removeClass('is-success').addClass('is-danger');
			$(icnUsername).removeClass('has-text-success').addClass('has-text-danger');
			$(txtUserWarning).text('Special characters except . and _ are not allowed');
			error[0] = true;
			validate(error);
		} else {
			if (!$(inpUserControl).hasClass('is-loading')) {
				$(inpUserControl).addClass('is-loading');
				$(btnCreate).attr('disabled', 'disabled');
				clearResponse(txtUserWarning, inpUsername, icnUsername, 0);
				$(inpUsername).attr('readonly', true);
				$.ajax({
					type: 'POST',
					url: 'users',
					data: {username:username, data:'username'},
					datatype: 'JSON',
					success: function(response) {
						if (response.status == 'error') {
							$(txtUserWarning).text(response.msg);
							$(inpUsername).removeClass('is-success').addClass('is-danger');
							$(icnUsername).removeClass('has-text-success').addClass('has-text-danger');
							error[0] = true;
						} else {
							$(inpUsername).removeClass('is-danger').addClass('is-success');
							$(icnUsername).removeClass('has-text-danger').addClass('has-text-success');
							error[0] = false;
						}
					},
					error: function(err) {
						serverErr(err);
						error[0] = true;
					}
				}).then(function() {
					$(inpUserControl).removeClass('is-loading');
					$(inpUsername).removeAttr('readonly');
					validate(error);
				});
			}
		}
	});

	$(inpUsername).keyup(function(e) {
		if (e.which !== 9) {
			clearResponse(txtUserWarning, this, icnUsername, 0);
		}
	});

	$(inpEmail).focusout(function() {
		var email = $(this).val(), valid_email = validateEmail(email);
		if (email.trim() == '') {
			$(this).removeClass('is-success').addClass('is-danger');
			$(icnEmail).removeClass('has-text-success').addClass('has-text-danger');
			$(txtEmailWarning).text('Email Address cannot be empty');
			error[1] = true;
			validate(error);
		} else if (!valid_email) {
			$(this).removeClass('is-success').addClass('is-danger');
			$(icnEmail).removeClass('has-text-success').addClass('has-text-danger');
			$(txtEmailWarning).text('Invalid format of email address');
			error[1] = true;
			validate(error);
		} else {
			if (!$(inpEmailControl).hasClass('is-loading')) {
				$(inpEmailControl).addClass('is-loading');
				$(btnCreate).attr('disabled', 'disabled');
				clearResponse(txtEmailWarning, inpEmail, icnEmail, 1);
				$(inpEmail).attr('readonly', true);
				$.ajax({
					type: 'POST',
					url: 'users',
					data: {email:email, data:'email'},
					success: function(response) {
						if (response.status == 'error') {
							$(txtEmailWarning).text(response.msg);
							$(inpEmail).removeClass('is-success').addClass('is-danger');
							$(icnEmail).removeClass('has-text-success').addClass('has-text-danger');
							error[1] = true;
						} else {
							$(inpEmail).removeClass('is-danger').addClass('is-success');
							$(icnEmail).removeClass('has-text-danger').addClass('has-text-success');
							error[1] = false;
						}
					},
					error: function(err) {
						serverErr(err);
						error[1] = true;
					}
				}).then(function() {
					$(inpEmailControl).removeClass('is-loading');
					$(inpEmail).removeAttr('readonly');
					validate(error);
				});
			}
		}
	});

	$(inpEmail).keyup(function(e) {
		if (e.which !== 9) {
			clearResponse(txtEmailWarning, this, icnEmail, 1);
		}
	});

// 	$('#view').click(function() {
// 		if( $('#password').attr('type') == 'password' ) {
// 			$('#password').attr('type', 'text');
// 			$('#icon-pass').removeClass('fa-eye').addClass('fa-eye-slash').addClass('has-text-white');
// 			$(this).removeClass('has-background-grey-lighter').addClass('has-background-grey-dark').addClass('is-selected');
// 		} else {
// 			$('#password').attr('type', 'password');
// 			$('#icon-pass').removeClass('fa-eye-slash').addClass('fa-eye').removeClass('has-text-white');
// 			$(this).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter').removeClass('is-selected');
// 		}
// 	});

// 	$('#password').focusout(function() {
// 		var pass = $(this).val();
// 		var confirm = $('#cpass').val();
// 		if (pass.length >= 8) {
// 			$(this).removeClass('is-danger');
// 			$('#pass-warning').text('');
// 			$('#create').removeAttr('disabled');
// 			if (confirm.trim() != "") {
// 				validatePassword(pass, confirm);
// 			}
// 			validate(error);
// 		} else {
// 			$(this).addClass('is-danger');
// 			$('#create').attr('disabled', 'disabled');
// 			$('#pass-icon').removeClass('has-text-success').addClass('has-text-danger');
// 			$('#cpass').removeClass('is-success').addClass('is-danger');
// 			$('#cpass-icon').removeClass('has-text-success').addClass('has-text-danger');
// 			$('#pass-warning').text('Password must be a minimum length of 8');
// 			error[2] = false;
// 			validate(error);
// 		}
// 	});

// 	$('#password').keyup(function() {
// 		$('#pass-warning').text('');
// 		$('#cpass-warning').text('');
// 		$(this).removeClass('is-danger');
// 		$('#cpass').removeClass('is-danger');
// 		$('#pass-icon').removeClass('has-text-danger');
// 		$('#cpass-icon').removeClass('has-text-danger');
// 		error[2] = true;
// 		validate(error);
// 	});

// 	$('#cpass').focusout(function() {
// 		var pass = $('#password').val();
// 		var confirm = $(this).val();
// 		if (pass.length >= 8) {
// 			validatePassword(pass, confirm);
// 		}
// 		validate(error);
// 	});

// 	$('#cpass').keyup(function() {
// 		var pass = $('#password').val();
// 		if (pass.length >= 8) {
// 			$('#cpass-warning').text('');
// 			$('#password').removeClass('is-success').removeClass('is-danger');
// 			$('#pass-icon').removeClass('has-text-success').removeClass('has-text-danger');
// 			$(this).removeClass('is-success').removeClass('is-danger');
// 			$('#cpass-icon').removeClass('has-text-success').removeClass('has-text-danger');
// 			error[2] = true;
// 			validate(error);
// 		}
// 	});


// 	// Mobile Version

// 	$('#mview').click(function() {
// 		if( $('#mpassword').attr('type') == 'password' ) {
// 			$('#mpassword').attr('type', 'text');
// 			$('#micon-pass').removeClass('fa-eye').addClass('fa-eye-slash').addClass('has-text-white');
// 			$(this).removeClass('has-background-grey-lighter').addClass('has-background-grey-dark').addClass('is-selected');
// 		} else {
// 			$('#mpassword').attr('type', 'password');
// 			$('#micon-pass').removeClass('fa-eye-slash').addClass('fa-eye').removeClass('has-text-white');
// 			$(this).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter').removeClass('is-selected');
// 		}
// 	});

// 	$('#mpassword').focusout(function() {
// 		var pass = $(this).val();
// 		var confirm = $('#mcpass').val();
// 		if (pass.length >= 8) {
// 			$(this).removeClass('is-danger');
// 			$('#mpass-warning').text('');
// 			$('#mcreate').removeAttr('disabled');
// 			if (confirm.trim() != "") {
// 				validatePassword(pass, confirm);
// 			}
// 			validate(error);
// 		} else {
// 			$(this).addClass('is-danger');
// 			$('#mcreate').attr('disabled', 'disabled');
// 			$('#mpass-icon').removeClass('has-text-success').addClass('has-text-danger');
// 			$('#mcpass').removeClass('is-success').addClass('is-danger');
// 			$('#mcpass-icon').removeClass('has-text-success').addClass('has-text-danger');
// 			$('#mpass-warning').text('Password must be a minimum length of 8');
// 		}
// 	});

// 	$('#mpassword').keyup(function() {
// 		$('#mpass-warning').text('');
// 		$('#mcpass-warning').text('');
// 		$(this).removeClass('is-danger');
// 		$('#mcpass').removeClass('is-danger');
// 		$('#mpass-icon').removeClass('has-text-danger');
// 		$('#mcpass-icon').removeClass('has-text-danger');
// 		error[2] = true;
// 		validate(error);
// 	});

// 	$('#mcpass').focusout(function() {
// 		var pass = $('#mpassword').val();
// 		var confirm = $(this).val();
// 		if (pass.length >= 8) {
// 			validatePassword(pass, confirm);
// 		}
// 	});

// 	$('#mcpass').keyup(function() {
// 		var pass = $('#mpassword').val();
// 		if (pass.length >= 8) {
// 			$('#mcpass-warning').text('');
// 			$('#mpassword').removeClass('is-success').removeClass('is-danger');
// 			$('#mpass-icon').removeClass('has-text-success').removeClass('has-text-danger');
// 			$(this).removeClass('is-success').removeClass('is-danger');
// 			$('#mcpass-icon').removeClass('has-text-success').removeClass('has-text-danger');
// 			error[2] = true;
// 			validate(error);
// 		}
// 	});
});
