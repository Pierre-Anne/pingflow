'use strict';

var sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./pingflow.db');

init();
populaiteCity();

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
	const favorits = `
		CREATE TABLE IF NOT EXISTS favorits (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			cityId INT,
			userId INT,
			CONSTRAINT comments_fk_userId FOREIGN KEY (userId)
          	REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
			CONSTRAINT cities_fk_cityId FOREIGN KEY (cityId)
          	REFERENCES city(id) ON UPDATE CASCADE ON DELETE CASCADE
		)`
    db.run(city);
    db.run(comment);
    db.run(user);
	db.run(favorits);
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
