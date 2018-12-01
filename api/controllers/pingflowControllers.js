'use strict';

var sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./pingflow.db');

init();

// populaiteCity();

function init() {
	const user = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,login TEXT,passwd TEXT)';
	const comment = `
		CREATE TABLE IF NOT EXISTS comments (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			comment TEXT,
			cityId INT,
			userId INT,
			CONSTRAINT comments_fk_userId FOREIGN KEY (userId)
          	REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
			CONSTRAINT cities_fk_cityId FOREIGN KEY (cityId)
          	REFERENCES city(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
	const city = `
		CREATE TABLE IF NOT EXISTS cities (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			country TEXT)`;
    db.run(city);
    db.run(comment);
    db.run(user);
}

function populaiteCity() {
	try {
		let sql = 'SELECT * FROM cities';
		db.all(sql, (err, cities) => {
			if (cities.length == 0) {
				let city = ['Lille', 'Paris', 'Marseille'];
				city.forEach((elm) => {
					db.run('INSERT INTO cities (name, country) VALUES (?, ?)', [elm, 'France']);
				});
			}
		});
	} catch (err){
		console.log('err :', err);
	}
}


exports.set_user = function(req, res) {
	try{
		let sql = 'SELECT id FROM users WHERE login = ?';
		db.all(sql, req.query.login, (err, usersId) => {
			if(err) {
				return res.status(400).json(err);
			}
			if(usersId.length > 0) {
				return res.status(400).json({msg:'this user already existed'});
			} else {
				db.run('INSERT INTO users (login, passwd) VALUES (?, ?)', [req.query.login, req.query.passwd], (err, user) => {
					if (err) {
						return res.status(400).json(err);
					}
					return res.status(200).json(user);
				});
			}
		});
	} catch (err){
		return res.status(400).json(err);
	}
}

exports.get_user = function(req, res) {
	res = crossOrigin(res);
	try{
		let sql = 'SELECT id, login FROM users';
		db.all(sql,req.query.id, (err, users) => {
			if (err) {
				return res.status(400).json({msg:'no users'});
			}
			return res.status(200).json(users);
		});

	} catch (err) {
		return res.status(400).json(err);
	}
}

exports.login = function(req, res) {
	try{
		let sql = 'SELECT * FROM users WHERE login = ? AND passwd = ?';
		db.get(sql, [req.query.login, req.query.passwd], (err, user) => {
			if (err) {
				return res.status(400).json({msg:'user not existed'});
			}
			return res.status(200).json(user);
		});
	} catch (err) {
		return res.status(400).json(err);
	}
}

exports.get_cities = function(req, res) {
	res = crossOrigin(res);
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

exports.get_comment = function (req, res) {
	res = crossOrigin(res);
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

function crossOrigin(res) {
	res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	return res;
}
