$(function() {
	function registerBtn(event) {
		if ($(btnLogin).hasClass('is-loading')) {
			event.preventDefault();
		} else {
			$('.title').text('Loading Registration');
			$('.pageloader').addClass('is-active');
		}
	}

	function ajaxResponse() {
		$(btnLogin).removeClass('is-loading');
		$(btnRegister).removeAttr('disabled');
		$(btnView).removeAttr('disabled');
		$(inpUsername).removeAttr('readonly');
		$(inpPassword).removeAttr('readonly');
	}

	var platform = window.matchMedia('only screen and (max-width: 768px)').matches ? 'm' : '';
	var inpPassword = `#${platform}password`, inpUsername = `#${platform}username`, btnView = `#${platform}view`, btnLogin = `#${platform}login`, btnRegister = `#${platform}register`, txtMsg = `#${platform}message`, icnViewPass = `#${platform}icon-pass`;

	$('html').removeClass('has-navbar-fixed-top');
	$('.title').text('Loading Login');

	$('form').submit(function(e) {
		e.preventDefault();
		if ($(inpPassword).attr('type') == 'text') {
			$(inpPassword).attr('type', 'password');
			$(icnViewPass).removeClass('fa-eye-slash').addClass('fa-eye').removeClass('has-text-white');
			$(btnView).removeClass('has-background-grey-dark').addClass('has-background-grey-lighter');
		}
		$(btnView).attr('disabled', true);
		$(btnLogin).addClass('is-loading');
		$(btnRegister).attr('disabled', true);
		$(inpUsername).attr('readonly', true);
		$(inpPassword).attr('readonly', true);
		let username = $(inpUsername).val(), password = $(inpPassword).val();
		$.ajax({
			type: 'POST',
			url: 'login',
			data: {username:username, password:password},
			datatype: 'JSON',
			success: function(response) {
				ajaxResponse();
				if (response.status == 'success') {
					Swal.fire({
						icon: 'success',
						title: response.message,
						showConfirmButton: false,
						timer: 2500
					}).then(function() {
						$('.title').text('Loading Dashboard');
						$('.pageloader').addClass('is-active');
						window.location.href = $('#js').data('link');
					});
				} else {
					$(txtMsg).text(response.message);
					$(inpPassword).val('');
					$(inpUsername).val('');
				}
			},
			error: function(err) {
				console.error(err);
				ajaxResponse();
				if (err.status == 429) {
					Swal.fire({
						icon: 'error',
						title: 'Too Many Login Attempts',
						text: 'Try again in a few minutes.'
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Cannot Log In to LinEase',
						text: 'Something went wrong. Please try again later.'
					});
				}
			}
		});
	});

	$(btnView).click(function() {
		$(icnViewPass).toggleClass('fa-eye').toggleClass('fa-eye-slash').toggleClass('has-text-white');
		$(this).toggleClass('has-background-grey-dark').toggleClass('has-background-grey-lighter');
		$(inpPassword).attr('type', function() {
			return $(this).attr('type') == 'password' ? 'text' : 'password';
		});
	});

	$(btnRegister).click(function(e) {
		registerBtn(e);
	});

	$(`#${platform}reglink`).click(function(e) {
		registerBtn(e);
	});

	$(inpUsername).keyup(function() {
		$(txtMsg).text('');
	});

	$(inpPassword).keyup(function() {
		$(txtMsg).text('');
	});
});
