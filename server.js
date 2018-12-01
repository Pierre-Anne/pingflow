
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

let http = require('http').Server(express());
let io = require('socket.io')(http);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/pingflowRoutes');
routes(app);

io.on('connection', (socket) => {
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('add-message', (message) => {
		io.emit('message', {
			type: 'new-message',
			text: message
		});
	});
});

app.listen(port);

http.listen(5000, () => {
	console.log('started on port 5000');
});

console.log('todo list RESTful API server started on: ' + port);
