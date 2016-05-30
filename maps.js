var view = new ol.View({ 
	center:ol.proj.fromLonLat([-73.993607, 40.738688]),
    zoom: 12
});

var map = new ol.Map({
	target: 'map',
    layers: [
	new ol.layer.Tile({
		source: new ol.source.MapQuest({layer: 'osm'})
	})
],
    view:view)
});
var geolocation = new ol.Geolocation ({
	projection:view.getProojection(),
    tracking:true});
geolocation.once('change:position', function() {
	view.setCenter(geolocation.getPosition());
	view.setResolution(2.388657133911758);});

