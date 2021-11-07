var map, marker, center = {lat:14.59468687747799, lng:120.99835708124482};
var features = [], base = $('#dashboard').data('link');

function gps_success (position) {
	center = {lat:position.coords.latitude, lng:position.coords.longitude};
	$('.title').text('Initializing Map');
	map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 15,
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false
	});

	if (features) {
		var icons = {
			critical: {
				icon: `${base}/S1Pin.png`,
				size: new google.maps.Size(20, 30),
				scaledSize: new google.maps.Size(20, 30),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 30)
			},
			major: {
				icon: `${base}/S2Pin.png`,
				size: new google.maps.Size(20, 30),
				scaledSize: new google.maps.Size(20, 30),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 30)
			},
			moderate: {
				icon: `${base}/S3Pin.png`,
				size: new google.maps.Size(20, 30),
				scaledSize: new google.maps.Size(20, 30),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 30)
			},
			light: {
				icon: `${base}/S4Pin.png`,
				size: new google.maps.Size(20, 30),
				scaledSize: new google.maps.Size(20, 30),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 30)
			},
			resolved: {
				icon: `${base}/RPin.png`,
				size: new google.maps.Size(20, 30),
				scaledSize: new google.maps.Size(20, 30),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 30)
			}
		};

		for (feature of features) {
			marker = new google.maps.Marker({
				position: feature.position,
				icon: feature.type.icon,
				// icon: icons[feature.type].icon,
				map: map
			});
		}
	}
	$('.title').text('');
	$('.pageloader').removeClass('is-active');
}

function gps_error (err) {
	console.warn(`Error ${err.code}: ${err.message}`);
	text = err.code == err.PERMISSION_DENIED ? 'LinEase cannot access your device\'s location. Please allow location permissions for LinEase to work properly.' : 'Your current location cannot be determined at this time.';
	Swal.fire({
		icon: 'error',
		title: 'Cannot Access Device Location',
		text: text,
		showConfirmButton: false,
		timer: 10000
	});
	map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 15,
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false
	});
	if (features) {
		for (feature of features) {
			marker = new google.maps.Marker({
				position: feature.position,
				icon: icons[feature.type].icon,
				map: map
			});
		}
	}
	$('.title').text('');
	$('.pageloader').removeClass('is-active');
}

function initMap() {
	$('.title').text('Fetching Map Markers');
	$.ajax({
		type: 'POST',
		url: 'markers',
		data: {source:'map'},
		datatype: 'JSON',
		success: function(data) {
			for (report of data) {
				features.push({
					position: new google.maps.LatLng(report.latitude, report.longitude),
					type: report.severity.toLowerCase()
				});
			}
		},
		error: function(err) {
			console.error(err);
			features = false;
			Swal.fire({
				icon: 'error',
				title: 'Cannot Get Map Markers',
				showConfirmButton: false,
				timer: 10000
			});
		}
	}).then(function() {
		$('.title').text('Initializing Geolocation');
		navigator.geolocation.getCurrentPosition(gps_success, gps_error);
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
