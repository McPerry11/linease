try {
	var map = tt.map({
		key: 'Laa6q2wr1ucatY7wmfHlvq4tgaDnpyR1',
		container: 'map',
		center: [120.99835708124482, 14.59468687747799],
		zoom: 14,
	});
} catch(err) {
	console.log(err);
	Swal.fire({
		icon: 'error',
		title: 'Cannot load map',
		text: 'Please refresh the page.',
		confirmButtonText: 'Refresh',
	}).then((result) => {
		location.reload();
	});
}

$(function() {
	$('.title').text('Loading Dashboard');
<<<<<<< HEAD
	// while(true) {
	// 	if (map.areTilesLoaded() && map.isStyleLoaded() && map.loaded()) {
	// 		$('.pageloader').removeClass('is-active');
	// 		break;
	// 	}
	// }
=======
>>>>>>> MCbranch

	$('#center').click(function() {
		$('.title').text('Loading Camera');
		$('.pageloader').addClass('is-active');
	});

	$('.navbar-menu .navbar-item').click(function() {
		if ($(this).data('id') == 'logout') {
			$('#logout').submit();
		} else {
			var page = $(this).text();
			$('.title').text('Loading ' + page);
			$('.pageloader').addClass('is-active');
		}
	});

	$('#logout').submit(function() {
		$('#logout button').addClass('is-loading');
		$('.pageloader .title').text('Logging Out');
		$('.pageloader').addClass('is-active');
	});
});
