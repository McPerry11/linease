function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:14.59468687747799, lng:120.99835708124482},
		zoom: 15,
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false
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

	$('#search').submit(function(e) {
		e.preventDefault();
		$('#search input').attr('readonly', true);
		$('#btn-search').addClass('is-loading');
		try {
			var request = {
				query: $('#search input').val(),
				fields: ['name', 'geometry', 'icon', 'formatted_address'],
			}, service = new google.maps.places.PlacesService(map);

			service.findPlaceFromQuery(request, function(results, status) {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					let coords = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
					map.setCenter(coords);
				}
				$('#search input').removeAttr('readonly');
				$('#btn-search').removeClass('is-loading');
			});
		} catch (err) {
			console.error(err);
			$('#search input').removeAttr('readonly');
			$('#btn-search').removeClass('is-loading');
			Swal.fire({
				icon: 'error',
				title: 'Cannot produce search results',
				text: 'LinEase encountered an error while searching for results.',
				showConfirmButton: false,
				timer: 10000
			});
		}
	});
});
