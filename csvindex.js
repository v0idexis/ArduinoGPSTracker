var express = require('express');

var app = express();

var server = app.listen(4000, () => { //Start server, listening on port 4000.
	console.log("Listening to requests on port 4000...");
});

var io = require('socket.io')(server); //Binding socket.io to express server

app.use(express.static(__dirname)); //Send index.html page on GET

function ioemit(cord,spd) {
	var today = new Date();
	io.sockets.emit('coord', {
		date: today.getDate() + "/" + (today.getMonth()+1)+ "/" + today.getFullYear(),
		time: (today.getHours()) + ":" + (today.getMinutes()) + ":" + (today.getSeconds()),
		coord: cord,
		speed: spd
	});
}

const csv = require('csv-parser');
const fs = require('fs');

const parser = fs.createReadStream('csv/CAR.CSV').pipe(csv()).on('data', (row) => {
	var start = new Date().getTime();
	var str = `${row["LAT"]},${row["LONG"]}`;
	var sped = `${row["SPEED"]}`;
	console.log(str);
	parser.pause();
	setTimeout(function() {
		ioemit(str,sped);
		parser.resume();
	}, 1000); //Delay control for data transmission
});

io.on('connection', (socket) => {
	console.log("Someone connected."); //show new clients connection log
})