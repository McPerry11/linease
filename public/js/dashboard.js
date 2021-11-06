try {
	var map = tt.map({
		key: 'Laa6q2wr1ucatY7wmfHlvq4tgaDnpyR1',
		container: 'map',
		center: [120.99835708124482, 14.59468687747799],
		zoom: 14,
	});
} catch(err) {
	console.error(err);
	Swal.fire({
		icon: 'error',
		title: 'Cannot load map',
		text: 'LinEase failed to load the map. Please check your internet connection.',
		showConfirmButton: false,
		timer: 10000
	});
}

$(function() {
	$('.title').text('Loading Dashboard');

	$('#center').click(function() {
		$('.title').text('Loading Camera');
		$('.pageloader').addClass('is-active');
	});

	$('.navbar-menu .navbar-item').click(function() {
		if ($(this).data('id') == 'logout') {
			$('#logout').submit();
		} else {
			var page = $(this).text();
			$('.title').text(`Loading ${page}`);
			$('.pageloader').addClass('is-active');
		}
	});

	$('#logout').submit(function() {
		$('#logout button').addClass('is-loading');
		$('.pageloader .title').text('Logging Out');
		$('.pageloader').addClass('is-active');
	});
});
