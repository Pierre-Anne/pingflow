'use strict';

var sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./pingflow.db');

exports.options_validation = function (req, res) {
	console.log('test de option pour la verification');
	return res.send(req.body);
}
