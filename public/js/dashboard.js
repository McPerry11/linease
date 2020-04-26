var map;
function initMap() {
	$('.title').text('Initializing Map');
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:14.5891, lng:120.9826},
		zoom: 15,
		disableDefaultUI: true,
	});

	var icons = {
		critical: {
			icon: 'img/S1Label.png',
		},
		heavy: {
			icon: 'img/S2Label.png',
		},
		moderate: {
			icon: 'img/S3Label.png',
		},
		light: {
			icon: 'img/S4Label.png',
		},
		resolved: {
			icon: 'img/RLabel.png',
		},
	};

	var legend = document.getElementById('legend');
	for (var key in icons) {
		var type = icons[key];
		var icon = type.icon;
		var div = document.createElement('div');
		div.innerHTML = '<img src="' + icon + '" width="45" height="45">';
		legend.appendChild(div);
	}
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(legend);

	var icons = {
		critical: {
			icon: 'img/S1Pin.png'
		}, major: {
			icon: 'img/S2Pin.png'
		}, moderate: {
			icon: 'img/S3Pin.png'
		}, light: {
			icon: 'img/S4Pin.png'
		}, resolved: {
			icon: 'img/RPin.png'
		}
	};
	var pin;
	$.ajax({
		type: 'POST',
		url: 'markers',
		data: {source:'map'},
		datatype: 'JSON',
		success: function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				switch (data[i].severity) {
					case 'CRITICAL':
						pin = 'critical';
						break;
					case 'MAJOR':
						pin = 'major';
						break;
					case 'MODERATE':
						pin = 'moderate';
						break;
					case 'LIGHT':
						pin = 'light';
						break;
					case 'RESOLVED':
						pin = 'resolved';
						break;
				}
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
					icon: icons[pin].icon,
					map: map,
				});
			}
		},
		error: function(err) {
			console.log(err);
			Swal.fire({
				type: 'error',
				title: 'Cannot Connect to Server',
				text: 'The reports cannot be retrieved from the server. Please refresh and try again.',
				confirmButtonText: 'Refresh',
			}).then((result) => {
				if (result.value) {
					window.location.reload();
				}
			});
		}
	});

	// HTML5 Geolocation
	infoWindow = new google.maps.InfoWindow;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Location Found.');
			infoWindow.open(map);
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ? 'Error: The geolocation service failed.' : 'Error: Your browser does not support geolocation.');
		infoWindow.open(map);
	}
}

$(function() {
	$('.title').text('Loading Dashboard');
	$(window).on('load', function() {
		$('.title').text('');
	});

	$('#center').click(function() {
		$('.title').text('Loading Camera');
		$('.pageloader').addClass('is-active');
	});

	$('.navbar-item').click(function() {
		var page = $(this).text();
		$('.title').text('Loading ' + page);
		$('.pageloader').addClass('is-active');
	});
});
