//This file is inter-dependent with toggle.js and hmap.js
// Connecting To server
var socket = io.connect('http://localhost:4000');
var globalcoord;
socket.on('coord', function(data) { //As coord data is received 
    //Log the coords in web console
    console.log(data.coord);
    if(stream == 1) {
        globalcoord = data.coord;
    }
    //split the single string into a array elements by commas so that they may be manipulated easily
    var latlng = data.coord.split(",");

    document.getElementById('date').innerHTML = data.date; //update the date
    document.getElementById('time').innerHTML = data.time; //update the date
    document.getElementById('speed').innerHTML = data.speed+" kmph"; //update the speed

    if(stream == 1) {
        if (centerlock == 1){
        map.setCenter({lat:latlng[0], lng:latlng[1]});
        }
        map.removeObject(carMarker);
        carMarker = new H.map.Marker({lat:latlng[0], lng:latlng[1]} , {icon: pngIcon});
        map.addObject(carMarker);
    }  
});