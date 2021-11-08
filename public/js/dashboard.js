var map, marker, init = true, text, cluster, geoloc = pins = false, center = {lat:14.59468687747799, lng:120.99835708124482};
var features = [], base = $('#dashboard').data('link'), icons = {
	critical: {
		icon: `${base}/S1Pin.png`,
	},
	major: {
		icon: `${base}/S2Pin.png`,
	},
	moderate: {
		icon: `${base}/S3Pin.png`,
	},
	light: {
		icon: `${base}/S4Pin.png`,
	},
	resolved: {
		icon: `${base}/RPin.png`,
	}
};;

function realtimeMarkers() {
	setInterval(function() {
		$.ajax({
			type: 'POST',
			url: 'markers',
			data: {source:'map'},
			datatype: 'JSON',
			success: function(data) {
				pins = true;
				features = [];
				for (report of data) {
					features.push({
						position: new google.maps.LatLng(report.latitude, report.longitude),
						type: report.severity.toLowerCase()
					});
				}

				for (feature of features) {
					markers = new google.maps.Marker({
						position: feature.position,
						icon: feature.type.icon,
						icon: icons[feature.type].icon,
						map: map
					});
				}
			},
			error: function(err) {
				console.error(err);
			}
		}).then(function() {
			if (init) {
				if (pins == false) {
					Swal.fire({
						icon: 'error',
						title: 'Cannot Get Map Markers',
						text: 'Trying to get map markers once again.',
						showConfirmButton: false,
						timer: 10000
					}).then(function() {
						if (geoloc == false) {
							Swal.fire({
								icon: 'error',
								title: 'Cannot Access Device Location',
								text: text,
								showConfirmButton: false,
								timer: 10000
							});
						}
					});
				} else if (geoloc == false) {
					Swal.fire({
						icon: 'error',
						title: 'Cannot Access Device Location',
						text: text,
						showConfirmButton: false,
						timer: 10000
					});
				}
				$('.title').text('');
				$('.pageloader').removeClass('is-active');
				init = false;
			}
		});
	}, 5000);
}

function getPosition() {
	return new Promise((position, err) => {
		navigator.geolocation.getCurrentPosition(position, err);
	});
}

async function initMap() {
	if ($('.pageloader').hasClass('is-active')) {
		$('.title').text('Initializing Geolocation');
		await getPosition().then((position) => {
			geoloc = true;
			center = {lat:position.coords.latitude, lng:position.coords.longitude};
		}).catch((err) => {
			console.warn(`Error ${err.code}: ${err.message}`);
			text = err.code == err.PERMISSION_DENIED ? 'LinEase cannot access your device\'s location. Please allow location permissions for LinEase to work properly.' : 'Your current location cannot be determined at this time.';
		});
		$('.title').text('Initializing Map');
		map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			zoom: 15,
			mapTypeControl: false,
			streetViewControl: false,
			fullscreenControl: false
		});
		$('.title').text('Fetching Map Markers');
		realtimeMarkers();
	}
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
		$('.title').text('Logging Out');
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
