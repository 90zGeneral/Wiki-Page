var db = require('../db.js');

module.exports.controller = function(app) {
	//Article - Index - All/Everything
	app.get('/articles', function (req, res) {
		db.all('articles', function (articles) {
			var data = {
				articles: articles
			}
			res.render('articlesIndex', data);
		});
	});

	//Article - New - render creation form
	app.get('/articles/new', function (req, res) {
		//The authors table is called because I will need to loop through it to grab each author for my drop down list
		db.all('categories', function (categories) {
			db.all('authors', function (authors) {
				var data = {
					authors: authors,
					categories: categories
				}
				res.render('articlesNew', data);
			});
		})
	});

	//Article - Show - one/individual
	app.get('/articles/:id', function (req, res) {
		db.find('articles', req.params.id, function (article) {
			db.find('authors', article[0].author_id, function (author) {
				var data = {
					author: author[0],
					article: article[0]
				}
				res.render('articleShow', data);
			});
		});
	});

	//Article - Create - has no render
	app.post('/articles', function (req, res) {
		db.create('articles', req.body, function (article) {	
			res.redirect('/articles');
		})
	});

	//Article - Edit - renders the page to edit an article
	app.get('/articles/edit/:id', function (req, res) {
		db.find('articles', req.params.id, function (article) {
			res.render('articlesEdit', article[0]);
		})
	});

	//Article - Update - has no render
	app.put('/articles/:id', function (req, res) {
		db.update('articles', req.body, req.params.id, function (article) {
			res.redirect('/articles/' + req.params.id);
		})
	});

	//Article - Delete - has no render
	app.delete('/articles/:id', function (req, res) {
		db.delete('articles', req.params.id, function (article) {
			res.redirect('/articles');
		})
	});


};