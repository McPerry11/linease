$(function() {
	function registerBtn(event) {
		if ($(btnLogin).hasClass('is-loading')) {
			event.preventDefault();
		} else {
			$('.title').text('Loading Registration');
			$('.pageloader').addClass('is-active');
		}
	}

	function resetMsg() {
		$(txtMsg).text('');
	}

	function ajaxResponse() {
		$(btnLogin).removeClass('is-loading');
		$(btnRegister).removeAttr('disabled');
		$(btnView).removeAttr('disabled');
		$(inpUsername).removeAttr('readonly');
		$(inpPassword).removeAttr('readonly');
	}

	var platform = '', isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;
	if (isMobile) {
		platform = 'm';
	}
	var inpPassword = '#' + platform + 'password', inpUsername = '#' + platform + 'username', btnView = '#' + platform + 'view', btnLogin = '#' + platform + 'login', btnRegister = '#' + platform + 'register', txtMsg = '#' + platform + 'message', icnViewPass = '#' + platform + 'icon-pass';

	$('html').removeClass('has-navbar-fixed-bottom').removeClass('has-navbar-fixed-top');
	$('.pageloader').removeClass('is-active');

	$('form').submit(function(e) {
		e.preventDefault();
		var username, password;
		if( $(inpPassword).attr('type') == 'text' ) {
			$(inpPassword).attr('type', 'password');
			$(icnViewPass).removeClass('fa-eye-slash').addClass('fa-eye').removeClass('has-text-white');
			$(btnView).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter').removeClass('is-selected');
		}
		$(btnView).attr('disabled', 'disabled');
		$(btnLogin).addClass('is-loading');
		$(btnRegister).attr('disabled', 'disabled');
		$(inpUsername).attr('readonly', true);
		$(inpPassword).attr('readonly', true);
		username = $(inpUsername).val();
		password = $(inpPassword).val();
		$.ajax({
			type: 'POST',
			url: 'login',
			data: {username:username, password:password},
			datatype: 'JSON',
			success: function(response) {
				ajaxResponse();
				if (response.status == 'success') {
					Swal.fire({
						type: 'success',
						title: response.message,
						showConfirmButton: false,
						timer: 2500
					}).then(function() {
						$('.title').text('Loading Dashboard');
						$('.pageloader').addClass('is-active');
						window.location.href = "/linease-alpha/public";
						// Server
						// window.location.href = "/linease-alpha";
					});
				} else if (response.status == 'error') {
					$(txtMsg).text(response.message);
					$(inpPassword).val('');
					$(inpUsername).val('');
				}
			},
			error: function(err) {
				console.log(err);
				ajaxResponse();
				Swal.fire({
					type: 'error',
					title: 'Cannot Log In to LinEase',
					text: 'Something went wrong. Please try again later.'
				});
			}
		});
	});

	$(btnView).click(function() {
		if( $(inpPassword).attr('type') == 'password' ) {
			$(inpPassword).attr('type', 'text');
			$(icnViewPass).removeClass('fa-eye').addClass('fa-eye-slash').addClass('has-text-white');
			$(this).removeClass('has-background-grey-lighter').addClass('has-background-grey-dark').addClass('is-selected');
		} else {
			$(inpPassword).attr('type', 'password');
			$(icnViewPass).removeClass('fa-eye-slash').addClass('fa-eye').removeClass('has-text-white');
			$(this).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter').removeClass('is-selected');
		}
	});

	$(btnRegister).click(function(e) {
		registerBtn(e);
	});

	$('#' + platform + 'reglink').click(function(e) {
		registerBtn(e);
	});

	$(inpUsername).keyup(function() {
		resetMsg();
	});

	$(inpPassword).keyup(function() {
		resetMsg();
	});
});
