//This file is inter-dependent with main.js and hmap.js
var b1 = document.getElementById('ctrlockbt');
var cl = document.getElementById('ctrlock');
var play = document.getElementById('play');
var pause = document.getElementById('pause');

//variable for center lock used in main.js
var centerlock = 1;
var stream = 1;

b1.onclick = function() {
    if (b1.value == "1") {
        centerlock = 0;
        cl.innerHTML = "Off";
        b1.value = "0";
        // b1.src = "images/gpin.png";
    }
    else{
        centerlock = 1;
        cl.innerHTML = "On";
        b1.value = "1";
        // b1.src = "images/rpin.png";
    }
};

play.onclick = function() {
    stream = 1;
};

pause.onclick = function() {
    stream = 0;
};

gmap.onclick = function() {
    window.open("http://maps.google.com/maps?q=description+(name)+%40"+globalcoord+"&t=k&z=15&ie=UTF8&iwloc=");
}