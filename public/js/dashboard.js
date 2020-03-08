var map;
function initMap() {
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
	$('.pageloader').removeClass('is-active');
	$('#center').click(function() {
		$('.pageloader').addClass('is-active');
	});

	$('.navbar-item').click(function() {
		$('.pageloader').addClass('is-active');
	});
});
