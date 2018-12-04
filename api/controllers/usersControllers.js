'use strict';

var sqlite3 = require('sqlite3');
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./pingflow.db');


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

exports.get_users = function(req, res) {
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
		db.get(sql, [req.body.login, req.body.passwd], (err, user) => {
			if (err) {
				return res.status(400).json(err);
			}
			if (user) {
				return res.status(200).json(user);
			} else {
				db.run('INSERT INTO users (login, passwd) VALUES (?, ?)', [req.body.login, req.body.passwd], (err, user) => {
					if (err) {
						return res.status(400).json(err);
					}
					return res.status(200).json(user);
				});
			}
		});
	} catch (err) {
		return res.status(400).json(err);
	}
}
