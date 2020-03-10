var map;
function initMap() {
	$(".title").text("Initializing Map");
	map = new google.maps.Map(document.getElementById('map'), {
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
}

$(function() {
	$('.title').text('Loading Dashboard');
	$(window).on("load", function() {
		$(".title").text("");
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
