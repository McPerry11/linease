$(function() {
	$('.pageloader .title').text('Loading Details');
	$('.content.navbar-item h3').text('Account');
	$('#back').attr('title', 'Go back to profile menu');

	$('#back').click(function() {
		$('.pageloader .title').text('Loading Profile');
		$('.pageloader').addClass('is-active');
	});
});
