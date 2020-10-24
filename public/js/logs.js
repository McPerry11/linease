$(function() {
	$('.pageloader .title').text('Loading Logs');
	$('html').removeClass('has-navbar-fixed-top');
	$('.navbar').removeClass('is-fixed-top');
	$('.content.navbar-item h3').text('Logs');
	$('#back').attr('title', 'Go back to dashboard');
});