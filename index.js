var express = require('express');
var portName = process.argv[2];

var app = express();
var server = app.listen(4000, () => { //Start server, listening on port 4000
	console.log("Listening to requests on port 4000...");
})

var io = require('socket.io')(server); //Binding socket.io to express server

app.use(express.static(__dirname)); //Send index.html page on GET

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort(portName, {
	baudRate: 115200
});

//Connect serial port to arduino port

const parser = port.pipe(new Readline({
	delimiter: '\r\n'
})); //Read the line only when new line comes.

parser.on('data', (gpsdat) => { //Read data
	console.log(gpsdat);
	var cmd = gpsdat.split(",");
	var gpsdata = cmd[1]+","+cmd[2];
	var spd = cmd[0];
	var today = new Date();
	io.sockets.emit('coord', {
		date: today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear(),
		time: (today.getHours()) + ":" + (today.getMinutes()) + ":" + (today.getSeconds()),
		coord: gpsdata,
		speed: spd
	}); //emit the datd i.e. {date, time, coord} to all the connected clients.
});

io.on('connection', (socket) => {
	console.log("Someone connected."); //show new clients connection log
})