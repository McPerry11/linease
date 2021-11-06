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

	$('a.box').click(function() {
		$('.pageloader .title').text(`Loading ${$(this).attr('data-user')}'s Profile`);
		$('.pageloader').addClass('is-active');
	});
});