var view = new ol.View({ 
	center:ol.proj.fromLonLat([-73.993607, 40.738688]),
	zoom: 12
});

var map = new ol.Map({
	target: 'map',
    layers: [new ol.layer.Tile({
	    source: new ol.source.MapQuest({layer: 'osm'})
    })],
    controls: ol.control.defaults({
		      attributionOptions:  ({
						   collapsible: false
					   })}),
    view:view
});
function el(id) {
	return document.getElementById(id);
}

var geolocation = new ol.Geolocation({
	projection: view.getProjection()
});

geolocation.setTracking(true);

var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
	accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
	image: new ol.style.Circle({
		       radius: 6,
		fill: new ol.style.Fill({
			color: '#3399CC'
		}),
		stroke: new ol.style.Stroke({
				color: '#fff',
		width: 2
			})
	       })
}));

geolocation.on('change:position', function() {
	var coordinates = geolocation.getPosition();
	positionFeature.setGeometry(coordinates ?
		new ol.geom.Point(coordinates) : null);
	view.setCenter(coordinates);
});

new ol.layer.Vector({
	map: map,
    source: new ol.source.Vector({
	    features: [accuracyFeature, positionFeature]
    })
});
