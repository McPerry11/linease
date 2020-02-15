var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:14.5891, lng:120.9826},
		zoom: 15,
		disableDefaultUI: true,
	});
}