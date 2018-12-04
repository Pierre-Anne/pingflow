'use strict';

var sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./pingflow.db');

exports.get_favorits = function (req, res) {
	try{
		let sql = 'SELECT * FROM favorits';
		db.all(sql, (err, favorits) => {
			if (err) {
				return res.status(400).json(err);
			}
			return res.status(200).json(favorits);
		});

	} catch (err) {
		return res.status(400).json(err);
	}
}

exports.set_favorit = function (req, res) {
	try{
		let sql = 'SELECT id FROM favorits WHERE userId = ? AND cityId = ?';
		db.all(sql, [req.query.userId, req.query.cityId], (err, favoritsId) => {
			if(err) {
				return res.status(400).json(err);
			}
			if(favoritsId.length > 0) {
				return res.status(400).json({msg:'this favorits is already added'});
			} else {
				db.run('INSERT INTO favorits (userId, cityId) VALUES (?, ?)', [req.query.userId, req.query.cityId], (err, favorit) => {
					if (err) {
						return res.status(400).json(err);
					}
					return res.status(200).json(favorit);
				});
			}
		});
	} catch (err){
		return res.status(400).json(err);
	}
}

exports.delete_favorit = function (req, res) {
	return res.status(200).json('ok');
}
