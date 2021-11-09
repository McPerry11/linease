var map, init = true, text, cluster, geoloc = pins = false, center = {lat:14.59468687747799, lng:120.99835708124482};
var markers = ids = temp = remove = add = [], base = $('#dashboard').data('link'), icons = {
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
};

function realtimeMarkers() {
	setInterval(function() {
		$.ajax({
			type: 'POST',
			url: 'markers',
			data: {source:'map'},
			datatype: 'JSON',
			success: async function(data) {
				if (data.length > 0) {
					pins = true, temp = [];
					add = data.filter((report) => {
						temp.push(report.id);
						if (!ids.includes(report.id)) {
							return report.id;
						}
					});

					remove = ids.filter((report_id) => {
						if (!temp.includes(report_id))
							return report_id;
					});
					ids = temp;

					if (remove.length > 0) {
						markers = markers.map((marker) => {
							if (remove.includes(parseInt(marker.title))) {
								marker.setMap(null);
								marker = null;
							} else {
								return marker;
							}
						});
						markers = markers.filter((marker) => {
							return marker != null;
						});
					}

					if (add.length > 0) {
						markers = data.map((report) => {
							marker = new google.maps.Marker({
								map: map,
								position: new google.maps.LatLng(report.latitude, report.longitude),
								icon: icons[report.severity.toLowerCase()].icon,
								title: `${report.id}`
							});

							google.maps.event.addListener(marker, 'click', (function(marker) {
								return function() {
									let report_id = parseInt(marker.title);
									map.panTo(marker.position);
									if (map.getZoom() < 19)
										map.setZoom(19);
									$('.modal').addClass('is-active');
									$.ajax({
										type: 'POST',
										url: 'report/' + report_id,
										datatype:'JSON',
										success: function(data) {
											var color;
											switch(data.severity) {
												case 'CRITICAL':
												color = '#4e1e73';
												break;
												case 'MAJOR':
												color = '#3598db';
												break;
												case 'MODERATE':
												color = '#9E1C21';
												break;
												case 'LIGHT':
												color = '#e8ca4d';
												break;
												case 'RESOLVED':
												color = '#087F38';
												break;
											}
											$('#date').text(data.date);
											$('#title').text(data.severity).css({'color': color});
											$('#address').text(data.address);
											$('#description').text(data.description);
											$('#reporter a').attr('href', `${$('#reporter').data('base')}/${data.username}`).text(data.username);
											$('.modal img').attr('src', `${$('.modal img').data('base')}/${data.picture}`).attr('alt', `Report #${data.id}`);
											$('#loader').addClass('is-hidden');
											$('.modal-content').removeClass('is-hidden');
										},
										error: function(err) {
											console.error(err);
											$('#loader').removeClass('is-hidden');
											$('.modal').removeClass('is-active');
											Swal.fire({
												icon: 'error',
												title: 'Cannot Fetch Marker Details',
												text: 'The report might have been deleted and removed from the map.',
												showConfirmButton: false,
												timer: 10000
											});
										}
									});
								}
							})(marker));
							return marker;
						});
					} 

					if (add.length > 0 || remove.length > 0) {
						if (cluster)
							cluster.clearMarkers();
						cluster = new markerClusterer.MarkerClusterer({
							map: map,
							markers: markers
						});
					}
				}
			},
			error: function(err) {
				console.error(err);
				if (err.status == 401) {
					Swal.fire({
						icon: 'warning',
						title: 'Session Expired',
						text: 'Please log in again.',
						confirmButtonText: 'Log In'
					}).then((result) => {
						if (result.isConfirmed) {
							$('.title').text('Redirecting to Login');
							$('.pageloader').addClass('is-active');
							window.location.href = $('#dashboard').data('expire');
						}
					});
				}
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
	}, 5000	);
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
			fullscreenControl: false,
			rotateControl: true
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

	$('.modal-background').click(function(){
		$('.modal').removeClass('is-active');
		$('#loader').removeClass('is-hidden');
		$('.modal-content').addClass('is-hidden');
	});

	$('#reporter a').click(function() {
		$('.title').text(`Loading ${$(this).text()}'s Profile`);
		$('.pageloader').addClass('is-active');
	});
});
