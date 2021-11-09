$(function() {
	$('.title').text('Loading Logs');
	$('html').removeClass('has-navbar-fixed-top');
	$('.navbar').removeClass('is-fixed-top');
	$('.content.navbar-item h3').text('Logs');
	$('#back').attr('title', 'Go back to dashboard');

	$('.tabs a').click(function() {
		let content = $(this).parent().attr('id');
		if (!$(`#${content}`).hasClass('is-active')) {
			$('.tabs li').removeClass('is-active');
			$(`#${content}`).addClass('is-active');
			switch (content){
				case 'reports':
				$('#reports_content').removeClass('is-hidden');
				$('#admin_content').addClass('is-hidden');
				break;

				case 'admin':
				$('#reports_content').addClass('is-hidden');
				$('#admin_content').removeClass('is-hidden');
				break;
			}
		}
	});

	$('#admin_content .box').click(function() {
		$('.title').text(`Loading ${$(this).attr('data-user')}'s Profile`);
		$('.pageloader').addClass('is-active');
	});

	$('#reports_content .box').click(function() {
		var report_id = $(this).data('id');
		$('.modal').addClass('is-active');
		$.ajax({
			type: 'POST',
			url: `report/${report_id}`,
			datatype:'JSON',
			success: function(data) {
				var color;
				console.log(data.username);
				switch(data.severity) {
					case 'CRITICAL':
					color = '#4e1e73';
					break;
					case 'MAJOR':
					color = '#3598db';
					break;
					case 'MODERATE':
					color = '#9E1C21';
					break;
					case 'LIGHT':
					color = '#e8ca4d';
					break;
					case 'RESOLVED':
					color = '#087F38';
					break;
				}
				$('#date').text(data.date);
				$('#title').text(data.severity).css({'color': color});
				$('#reporter a').attr('href', `${$('#reporter').data('base')}/${data.username}`).text(data.username);
				$('#address').text(data.address);
				$('#description').text(data.description);
				$('.modal img').attr('src', `${$('#logs').data('base')}/${data.picture}`).attr('alt', `Report #${data.id}`);
				$('#loader').addClass('is-hidden');
				$('.modal-content').removeClass('is-hidden');
			},
			error: function(err) {
				console.error(err);
				$('.modal').removeClass('is-active');
				Swal.fire({
					icon: 'error',
					title: 'Cannot Retrieve Report',
					text: 'An error occured while retrieving the report.',
					showConfirmButton: false,
					timer: 10000
				});
			}
		})
	});

	$('.modal-background').click(function(){
		$('.modal').removeClass('is-active');
		$('#loader').removeClass('is-hidden');
		$('.modal-content').addClass('is-hidden');
	});

	$('#reporter a').click(function() {
		$('.title').text(`Loading ${$(this).text()}'s Profile`);
		$('.pageloader').addClass('is-active');
	});
});