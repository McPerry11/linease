$(function() {
	function ajaxError(err, input, control) {
		console.error(err);
		$(control).removeClass('is-loading');
		$(input).removeAttr('readonly');
		validate(error);
		Swal.fire({
			icon: 'error',
			title: 'Cannot Connect to server',
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

	function clearResponse(warning, textbox, icon, seq) {
		$(warning).text('');
		$(textbox).removeClass('is-success').removeClass('is-danger');
		$(icon).removeClass('has-text-success').removeClass('has-text-danger');
		error[seq % 3] = seq > 2;
		validate(error);
	}

	function checkInputs(input, textbox, icon, warning, warnMsg, valid, invalidMsg, seq) {
		if (input.trim() == '') {
			$(textbox).removeClass('is-success').addClass('is-danger');
			$(icon).removeClass('has-text-success').addClass('has-text-danger');
			$(warning).text(warnMsg);
			error[seq] = true;
			validate(error);
			return false;
		} else if (!valid) {
			$(textbox).removeClass('is-success').addClass('is-danger');
			$(icon).removeClass('has-text-success').addClass('has-text-danger');
			$(warning).text(invalidMsg);
			error[seq] = true;
			validate(error);
			return false;
		}
		return true;
	}

	function checkResponse(response, warning, input, control, icon, seq) {
		if (response.status == 'error') {
			$(warning).text(response.msg);
			$(input).removeClass('is-success').addClass('is-danger');
			$(icon).removeClass('has-text-success').addClass('has-text-danger');
		} else {
			$(input).removeClass('is-danger').addClass('is-success');
			$(icon).removeClass('has-text-danger').addClass('has-text-success');
		}
		error[seq] = response.status == 'error';
		$(control).removeClass('is-loading');
		$(input).removeAttr('readonly');
		validate(error);
	}

	function validatePassword(pass, confirm) {
		if (pass == confirm) {
			$(inpPassword).removeClass('is-danger').addClass('is-success');
			$(icnPassword).removeClass('has-text-danger').addClass('has-text-success');
			$(inpConfirm).removeClass('is-danger').addClass('is-success');
			$(icnConfirm).removeClass('has-text-danger').addClass('has-text-success');
		} else {
			$(txtConfirmWarning).text('Passwords do not match');
			$(inpPassword).removeClass('is-success').addClass('is-danger');
			$(icnPassword).removeClass('has-text-success').addClass('has-text-danger');
			$(inpConfirm).removeClass('is-success').addClass('is-danger');
			$(icnConfirm).removeClass('has-text-success').addClass('has-text-danger');
		}
		error[2] = pass !== confirm;
		validate(error);
	}

	function ajaxResponse() {
		$(btnCreate).removeClass('is-loading');
		$(btnView).removeAttr('disabled');
		$(inpUsername).removeAttr('readonly');
		$(inpEmail).removeAttr('readonly');
		$(inpPassword).removeAttr('readonly');
		$(inpConfirm).removeAttr('readonly');
		validate(error);
	}

	function serverValidateError(input, icon, warning, msg, seq) {
		$(input).addClass('is-danger');
		$(icon).addClass('has-text-danger');
		$(warning).text(msg);
		error[seq] = true;
		validate(error);
	}

	var error = [false, false, false], platform = window.matchMedia('only screen and (max-width: 768px)').matches ? 'm' : '';
	var btnCreate = `#${platform}create`, btnView = `#${platform}view`;
	var inpUsername = `#${platform}username`, icnUsername = `#${platform}user-icon`, txtUserWarning = `#${platform}user-warning`, inpUserControl = `#${platform}user-control`;
	var inpEmail = `#${platform}email`, icnEmail = `#${platform}email-icon`, txtEmailWarning = `#${platform}email-warning`, inpEmailControl = `#${platform}email-control`;
	var icnEye = `#${platform}icon-pass`, inpPassword = `#${platform}password`, icnPassword = `#${platform}pass-icon`, txtPassWarning = `#${platform}pass-warning`;
	var inpConfirm = `#${platform}cpass`, icnConfirm = `#${platform}cpass-icon`, txtConfirmWarning = `#${platform}cpass-warning`;

	$('html').removeClass('has-navbar-fixed-bottom').removeClass('has-navbar-fixed-top');
	$('.title').text('Loading Registration');

	// $(inpUsername).bind({
	// 	keydown: function(e) {
	// 		if (e.shiftKey == true) {
	// 			if (e.which == 189 || (e.which >= 65 && e.which <= 90) || e.which <= 40)
	// 				return true;
	// 		} else if (e.shiftKey == false && ((e.which >= 48 && e.which <= 57) || e.which == 190)) {
	// 			return true;
	// 		} else if ((e.which >= 65 && e.which <= 90) || e.which <= 40 || (e.which >= 96 && e.which <= 105) || (e.which >= 112 && e.which <= 123)) {
	// 			return true;
	// 		}
	// 		return false;
	// 	}
	// });

	// $(inpEmail).bind({
	// 	keydown: function(e) {
	// 		if (e.shiftKey == true) {
	// 			if (e.which == 189 || e.which == 50)
	// 				return true;
	// 		} else if (((e.which > 47 && e.which < 58) || e.which == 190) && e.shiftKey == false) {
	// 			return true;
	// 		}
	// 		if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 90) || e.which < 32 || (e.which > 126 && e.which < 160) || (e.which < 41 && e.which > 34))
	// 			return true;
	// 		return false;
	// 	}
	// });

	$('form').submit(function(e) {
		e.preventDefault();
		if ($(inpPassword).attr('type') == 'text') {
			$(inpPassword).attr('type', 'password');
			$(icnEye).removeClass('fa-eye-slash').addClass('fa-eye').addClass('has-text-white');
			$(btnView).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter');
		}
		$(btnCreate).addClass('is-loading');
		$(btnView).attr('disabled', 'disabled');
		$(inpUsername).attr('readonly', true);
		$(inpEmail).attr('readonly', true);
		$(inpPassword).attr('readonly', true);
		$(inpConfirm).attr('readonly', true);
		let username = $(inpUsername).val(), email = $(inpEmail).val(), password = $(inpPassword).val(), confirm = $(inpConfirm).val();
		$.ajax({
			type: 'POST',
			url: 'register',
			data: {username:username, email:email, password:password, confirm:confirm},
			datatype: 'JSON',
			success: function(response) {
				ajaxResponse();
				if (response.status == 'error') {
					switch(response.data) {
						case 'username':
						serverValidateError(inpUsername, icnUsername, txtUserWarning, response.warn, 0);
						break;
						case 'email':
						serverValidateError(inpEmail, icnEmail, txtEmailWarning, response.warn, 1);
						break;
						case 'password':
						serverValidateError(inpPassword, icnPassword, txtPassWarning, response.warn, 2);
						break;
						case 'confirm':
						serverValidateError(inpPassword, icnPassword, txtPassWarning, '', 2);
						serverValidateError(inpConfirm, icnConfirm, txtConfirmWarning, response.warn, 2);
						break;
					}
					validate(error);
					Swal.fire({
						icon: 'error',
						title: 'Registration Failed',
						text: response.msg,
						confirmButtonText: 'Try Again'
					});
				} else {
					Swal.fire({
						icon: 'success',
						title: 'Registration Successful',
						text: response.msg,
						confirmButtonText: 'Sign In'
					}).then((result) => {
						if (result.value) {
							$('.title').text('Loading Login');
							$('.pageloader').addClass('is-active');
							window.location.href = $('#js').data('link');
						}
					});
				}
			},
			error: function(err) {
				console.log(err);
				ajaxResponse();
				Swal.fire({
					icon: 'error',
					title: 'Cannot connect to server',
					text: 'Something went wrong. Please try again later.'
				});
			}
		});
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
		if (6 <= $(this).val().trim().length && $(this).val().trim().length <= 30) {
			if (!$(btnCreate).hasClass('is-loading')) {
				let expr = /^(?=.{5,20})[\w\.]*[a-z0-9]+[\w\.]*$/i, message1 = 'Username cannot be empty', message2 = 'Username must be between 5 to 20 characters with at least 1 alphanumeric character';
				var username = $(this).val(), valid = expr.test(username);;
				let proceed = checkInputs(username, this, icnUsername, txtUserWarning, message1, valid, message2, 0);
				if (proceed) {
					if (!$(inpUserControl).hasClass('is-loading')) {
						$(inpUserControl).addClass('is-loading');
						clearResponse(txtUserWarning, this, icnUsername, 3);
						$(this).attr('readonly', true);
						$.ajax({
							type: 'POST',
							url: 'users',
							data: {username:username, data:'username'},
							datatype: 'JSON',
							success: function(response) {
								checkResponse(response, txtUserWarning, inpUsername, inpUserControl, icnUsername, 0);
							},
							error: function(err) {
								error[0] = true;
								ajaxError(err, inpUsername, inpUserControl);
							}
						});
					}
				}
			}
		} else {
			$(this).removeClass('is-success').addClass('is-danger');
			$(icnUsername).removeClass('has-text-success').addClass('has-text-danger');
			$(txtUserWarning).text('Username must be between 5 to 20 characters with at least 1 alphabetical character');
			error[0] = true;
			validate(error);
		}
	});

	$(inpUsername).keyup(function(e) {
		if (!$(btnCreate).hasClass('is-loading')) if (e.which !== 9) clearResponse(txtUserWarning, this, icnUsername, 0);
	});

	$(inpEmail).focusout(function() {
		if (!$(btnCreate).hasClass('is-loading')) {
			let expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, message1 = 'Email Address cannot be empty', message2 = 'Invalid email address';
			var email = $(this).val(), valid = expr.test(email);;
			let proceed = checkInputs(email, this, icnEmail, txtEmailWarning, message1, valid, message2, 1);
			if (proceed) {
				if (!$(inpEmailControl).hasClass('is-loading')) {
					$(inpEmailControl).addClass('is-loading');
					clearResponse(txtEmailWarning, this, icnEmail, 4);
					$(this).attr('readonly', true);
					$.ajax({	
						type: 'POST',
						url: 'users',
						data: {email:email, data:'email'},
						success: function(response) {
							checkResponse(response, txtEmailWarning, inpEmail, inpEmailControl, icnEmail, 1);
						},
						error: function(err) {
							error[1] = true;
							ajaxError(err, inpEmail, inpEmailControl);
						}
					});
				}
			}
		}
	});

	$(inpEmail).keyup(function(e) {
		if (!$(btnCreate).hasClass('is-loading')) if (e.which !== 9) clearResponse(txtEmailWarning, this, icnEmail, 1);
	});

	$(btnView).click(function() {
		$(icnEye).toggleClass('fa-eye-slash').toggleClass('fa-eye').toggleClass('has-text-white');
		$(this).toggleClass('has-background-grey-dark').toggleClass('has-background-grey-lighter');
		$(inpPassword).attr('type', function() {
			return $(this).attr('type') == 'password' ? 'text' : 'password';
		});
	});

	$(inpPassword).focusout(function() {
		if (!$(btnCreate).hasClass('is-loading')) {
			var pass = $(this).val(), confirm = $(inpConfirm).val();
			if (pass.length >= 8) {
				if (confirm != "") {
					validatePassword(pass, confirm);
				} else {
					error[2] = false;
					validate(error);
				}
			} else {
				$(this).removeClass('is-success').addClass('is-danger');
				$(icnPassword).removeClass('has-text-success').addClass('has-text-danger');
				$(txtPassWarning).text('Password must be a minimum length of 8 characters');
				clearResponse(txtConfirmWarning, inpConfirm, inpConfirm, 5);
			}
		}
	});

	$(inpPassword).keyup(function(e) {
		if (!$(btnCreate).hasClass('is-loading')) {
			if (e.which !== 9) {
				clearResponse(txtPassWarning, this, icnPassword, 2);
				clearResponse(txtConfirmWarning, inpConfirm, icnConfirm, 2);
			}
		}
	});

	$(inpConfirm).focusout(function() {
		if (!$(btnCreate).hasClass('is-loading')) {
			var pass = $(inpPassword).val(), confirm = $(this).val();
			if (pass.length >= 8) validatePassword(pass, confirm);
		}
	});

	$(inpConfirm).keyup(function(e) {
		if (!$(btnCreate).hasClass('is-loading')) {
			if ($(inpPassword).val() != '' && $(inpPassword).val().length >= 8 && e.which !== 9) {
				clearResponse(txtPassWarning, inpPassword, icnPassword, 2);
				clearResponse(txtConfirmWarning, this, icnConfirm, 2);
			}
		}
	});
});
