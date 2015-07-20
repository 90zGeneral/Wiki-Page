var db = require('../db.js');

module.exports.controller = function(app) {
	//Category - Index - All/Everything
	app.get('/categories', function (req, res) {
		db.all('categories', function (categories) {
			var data = {
				categories: categories
			}
			res.render('categoriesIndex', data);
		});
	});


	//Category - Show - One/Individual
	app.get('/categories/:id', function (req, res) {
		query = "select a.*, aut.username from articles a left join authors aut on a.author_id = aut.id where a.category_id = " + req.params.id;

		db.query(query, function(results){
			var data = {
				articles: results
			}
			res.render('categoryShow', data)
		});
	});

	//Category - Edit - renders the page to edit an article
	app.get('/articles/edit/:id', function (req, res) {
		db.find('articles', req.params.id, function (article) {
			res.render('articlesEdit', article[0]);
		});
	});

	//Article - Update - has no render
	app.put('/articles/:id', function (req, res) {
		db.update('articles', req.body, req.params.id, function (article) {
			res.redirect('/categories');
		})
	});

};