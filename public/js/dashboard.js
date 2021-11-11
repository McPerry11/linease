var introbtn, map, init = true, text, cluster, geoloc = pins = false, center = {lat:14.59468687747799, lng:120.99835708124482};
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

function obAJAX() {
	$.ajax({
		type: 'POST',
		url: `${$('#accounts').data('user')}/update`,
		data: {tab:'ob', module:'dashboard'},
		datatype: 'JSON',
		error: function(err) {
			console.error(err);
			obAJAX();
		}
	});
}

function realtimeMarkers() {
	setInterval(function() {
		$.ajax({
			type: 'POST',
			url: 'markers',
			data: {source:'map'},
			datatype: 'JSON',
			success: async function(data) {
				pins = true;
				if (data.length > 0) {
					temp = [];
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
				if ($('#dashboard').data('ob') == 0) {
					introJs().setOptions({
						disableInteraction: true,
						showBullets: false,
						exitOnOverlayClick: false,
						exitOnEsc: false,
						steps: [{
							title: 'Welcome to LinEase!',
							intro: 'Seems like you\'re new to LinEase. Start learning how LinEase works!'
						},
						{
							title: 'About LinEase',
							intro: 'LinEase is a land pollution action network application meant to monitor and raise public awareness about polluted areas that needs cleaning and maintaining while simultaneously serving as a platform for reporting polluted locations or issues related to this matter.'
						},
						{
							element: document.querySelector('#map-container'),
							title: 'Map',
							intro: 'This map will serve as your dashboard. Reports submitted by users are updated in real-time! See how many reports there are in your area here.'
						},
						{
							element: document.querySelector('#search'),
							title: 'Search',
							intro: 'Want to look for reports in a specific location? Just search the address in this searchbox! LinEase uses Google Maps as its mapping service. Any place Google Maps can find, we can find also!'
						},
						{
							element: document.querySelector('#center'),
							title: 'Submitting Reports',
							intro: 'If you want to submit a report, click the LinEase icon here on the bottom of your screen! However, only verified users can submit reports. Let\'s complete your profile first to be able to submit reports!',
						},
						{
							element: document.querySelector('.navbar-burger'),
							title: 'Menu',
							intro: 'Click the menu here on the top right to open the navigation menu. Then click Profile from the menu and complete your LinEase profile there!'
						}]
					}).start().onchange(function() {
						if ($('.introjs-tooltip-title').text() == 'Submitting Reports') {
							setTimeout(function() {
								if (introbtn == 'next') {
									$('.introjs-arrow').removeClass('top-middle').addClass('top-right');
									$('.introjs-tooltip').css('left', '-250px');
								}
							}, 400);
						}
					}).oncomplete(function() {
						obAJAX();
					});
				}
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
			fullscreenControl: false,
			rotateControl: true,
			keyboardShortcuts: false
		});
		$('.title').text('Fetching Map Markers');
		realtimeMarkers();
	}
}

$(function() {
	$('.title').text('Loading Dashboard');

	$(document).on('click', '.introjs-prevbutton', function() {
		introbtn = 'previous';
	});

	$(document).on('click', '.introjs-nextbutton', function() {
		introbtn = 'next';
	});

	$('#center').click(function() {
		if ($(this).data('valid') == 0) {
			Swal.fire({
				icon: 'info',
				title: 'Unverified Account',
				text: 'Unverified accounts cannot submit reports. Complete your profile first to be able to submit reports.',
				confirmButtonText: 'Go to Profile!',
				showCancelButton: true,
				cancelButtonText: 'Maybe Later',
				reverseButtons: true
			}).then((result) => {
				if (result.isConfirmed) {
					$('.title').text('Redirecting to Profile');
					$('.pageloader').addClass('is-active');
					window.location.href = $('#center').data('profile');
				}
			});
		} else {
			$('.title').text('Loading Camera');
			$('.pageloader').addClass('is-active');
			window.location.href = $('#center').data('camera');
		}
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
