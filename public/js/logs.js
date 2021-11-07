$(function() {
	$('.pageloader .title').text('Loading Logs');
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

	$('#admin_content a.box').click(function() {
		$('.pageloader .title').text(`Loading ${$(this).attr('data-user')}'s Profile`);
		$('.pageloader').addClass('is-active');
	});

	$('#reports_content a.box').click(function() {
		var report_id = $(this).data('id');
		console.log(report_id)
		$.ajax({
			type: 'POST',
			url: 'report/' + report_id,
			datatype:'JSON',

			success: function(data) {
				console.log(data)
				var color;
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
				$('#log_date').text(data.created_at);
				$('#log_title').text(data.severity).css({'color': color});
				$('#log_address').text(data.address);
				$('#log_description').text(data.description);
				$('.modal').addClass('is-active');
			},
			error: function(err) {
				console.log(err);
			}
		})
	});

	$('.modal-background').click(function(){
		$('.modal').removeClass('is-active');
	});
});