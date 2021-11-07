var map, base = $('#dashbard').data('link'), icons = {
	critical: {
		icon: `${base}/S1Pin.png`
	},
	major: {
		icon: `${base}/S2Pin.png`
	},
	moderate: {
		icon: `${base}/S3Pin.png`
	},
	light: {
		icon: `${base}/S4Pin.png`
	},
	resolved: {
		icon: `${base}/RPin.png`
	}
};

function initMap() {
	// $.ajax({
	// 	type: 'POST',
	// 	url: 'markers',
	// 	datatype: 'JSON',
	// 	success: function(data) {
		
	// 	},
	// 	error: function(err) {
	// 		console.error(err);
	// 		Swal.fire({
	// 			icon: 'error',
	// 			title: 'Cannot Get Map Markers',
	// 			showConfirmButton: false,
	// 			timer: 10000
	// 		});
	// 	}
	// });
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:14.59468687747799, lng:120.99835708124482},
		zoom: 15,
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false
	});
	$('.title').text('');
	$('.pageloader').removeClass('is-active');
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
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					map.panTo(results[0].geometry.location);
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
				title: 'Cannot Produce Search Results',
				text: 'LinEase encountered an error while searching for results.',
				showConfirmButton: false,
				timer: 10000
			});
		}
	});
});
