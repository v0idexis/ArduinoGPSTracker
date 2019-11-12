//This file is inter-dependent with toggle.js and main.js
//API Key for Here Maps            
var platform = new H.service.Platform({
    'apikey': 'Ylstvi4R2FzshO1fLLI4rnvBC3gf5qo-25otEp4Cpjo'
});

// Initializing Map
var defaultLayers = platform.createDefaultLayers();            
var maptypes = platform.createDefaultLayers();
var map = new H.Map(
    document.getElementById('mapCont'),
    maptypes.raster.satellite.map,
    {
      zoom: 15
    });            

window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));            
// Create the default UI components for map
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Marker icon
var pngIcon = new H.map.Icon("images/baja.png", {size: {w: 35, h: 35}});            
var carMarker = new H.map.Marker({lat:40.4, lng: -3.6833} , {icon: pngIcon});
    map.addObject(carMarker);