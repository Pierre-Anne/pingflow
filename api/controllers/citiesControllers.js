'use strict';

var sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./pingflow.db');

exports.get_cities = function(req, res) {
	try{
		let sql = 'SELECT * FROM cities';
		db.all(sql, (err, cities) => {
			if (err) {
				return res.status(400).json(err);
			}
			return res.status(200).json(cities);
		});

	} catch (err) {
		return res.status(400).json(err);
	}
}

exports.set_cities = function(req, res) {
	try{
		let sql = 'SELECT id FROM cities WHERE name = ?';
		db.all(sql, req.query.cityName, (err, usersId) => {
			if(err) {
				return res.status(400).json(err);
			}
			if(usersId.length > 0) {
				return res.status(400).json({msg:'this city already existed'});
			} else {
				db.run('INSERT INTO cities (name, country) VALUES (?, ?)', [req.query.cityName, req.query.country], (err, city) => {
					if (err) {
						return res.status(400).json(err);
					}
					return res.status(200).json(city);
				});
			}
		});
	} catch (err){
		return res.status(400).json(err);
	}
}
