var pg = require('pg');
var dbUrl = "pg://localhost/wiki_page_db";

module.exports = {
	end: function() {
		pg.end();
	},
	query: function(q, cb){
		pg.connect(dbUrl, function (err, client, done) {
			client.query(q, function (err, result) {
				done();
				cb(result.rows);
			});
		});
		this.end();
	},
	all: function (table, cb) {
		pg.connect(dbUrl, function (err, client, done) {
			client.query('SELECT * FROM ' + table, function (err, result) {
				done();
				cb(result.rows);
			});
		});
		this.end();
	},
	find: function (table, id, cb) {
		pg.connect(dbUrl, function (err, client, done) {
			client.query('SELECT * FROM ' + table + ' WHERE id=' + id, function (err, result) {
				done();
				cb(result.rows);
			});
		});
		this.end();
	},
	findRelations: function (table, column, id, cb) {
		pg.connect(dbUrl, function (err, client, done) {
			client.query('SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id, function (err, result) {
				done();
				if(err) {
					console.error(err);
				}
				cb(result.rows);
			});
		});
		this.end();
	},
	delete: function (table, id, cb) {
		pg.connect(dbUrl, function (err, client, done) {
			client.query('DELETE FROM ' + table + ' WHERE id=' + id, function (err, result) {
				done();
				cb(result);
			});
		});
		this.end();
	},
	create: function (table, obj, cb) {
		pg.connect(dbUrl, function (err, client, done) {
			var columns = [];
			var values = [];
			var dollars = [];
			Object.keys(obj).forEach(function (key, i) {
				columns.push(key);
				values.push(obj[columns[i]]);
				dollars.push('$' + (i + 1));
			});
			var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ') VALUES(' + dollars.join(', ') + ') RETURNING id AS id'; 
			client.query(query, values, function (err, result) {
				done();
				cb(result.rows[0]);
			});
		});
		this.end();
	},
	update: function (table, obj, id, cb) {
		pg.connect(dbUrl, function (err, client, done) {
			var columns = [];
			var set = [];
			var values = [];
			Object.keys(obj).forEach(function (key, i) {
				columns.push(key);
				set.push(key + '=($' + (i + 1) + ')');
				values.push(obj[columns[i]]);
			});
			client.query('UPDATE ' + table + ' SET ' + set.join(', ') + ' WHERE id=' + id, values, function (err, result) {
				done();
				cb(result);
			});
		})
		this.end();
	}
	// findArticleAuthor: function (table, id, article, cb) {
	// 	pg.connect(dbUrl, function (err, client, done) {
	// 		done();
	// 		client.query('SELECT * FROM ' + table + ' WHERE ')
	// 	});
	// }
// SELECT author.name WHERE articles.author_id = author.id
};

