var db = require('../db.js');

module.exports.controller = function(app) {
	//Author - Index - All/Everything
	app.get('/authors', function (req, res) {
		db.all('authors', function (authors) {
			var data = {
				authors: authors
			}
			res.render('authorsIndex', data);
		})
	});

	//Author - New - render creation form
	app.get('/authors/new', function (req, res) {
		res.render('authorsNew');
	});

	//Author - Show - one/individual
	app.get('/authors/:id', function (req, res) {
		db.find('authors', req.params.id, function (author) {
			db.findRelations('articles', 'author_id', req.params.id, function (articles) {
				var data = {
					author: author[0],
					articles: articles
				}
				res.render('authorShow', data);
			});
		});
	});

	//Author - Create - has no render
	app.post('/authors', function (req, res) {
		db.create('authors', req.body, function (author) {
			res.redirect('/authors');
		});
	});

	//Author - Delete - has no render
	app.delete('/authors/:id', function (req, res) {
		db.delete('authors', req.params.id, function (author) {
			res.redirect('/authors');
		});
	});
};


