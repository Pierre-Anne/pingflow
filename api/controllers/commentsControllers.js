'use strict';

var sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./pingflow.db');

exports.get_comments = function (req, res) {
	try{
		let sql = 'SELECT * FROM comments';
		db.all(sql, (err, comments) => {
			if (err) {
				return res.status(400).json(err);
			}
			return res.status(200).json(comments);
		});

	} catch (err) {
		return res.status(400).json(err);
	}
}

exports.set_comment = function (req, res) {
	try{
		db.run('INSERT INTO comments (comment, userId, cityId) VALUES (?, ?, ?)', [req.body.comment, req.body.userId, req.body.cityId], (err, city) => {
			if (err) {
				return res.status(400).json(err);
			}
			return res.status(200).json(city);
		});
	} catch (err){
		return res.status(400).json(err);
	}
}
