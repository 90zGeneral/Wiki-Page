// To connect to my db.js file 
// var db = require('./db.js');

// This is an array to store the names of all the authors.
var writers = ["Roydon"];

// This array holds the position/title of each author.
var position = ["Associate", "Clerk", "Janiter", "Cashier", "Supervisor", "Department Manager", "Floor Manager", "Store Manager"];

//
var department = ["Plumbing", "Electical", "Hardware", "Appliance", "Lumber", "Paint", "Seasonal", "Outdoors", "Kitchen", "Home Decor", "Cleaning Supplies"]

//
var fullTime = [true, false];

//
var username = ["roy_the_ladies_joy"];

//
var email = ["royboy@aol.com"];

//
var password = ["b0yr0y"];

//
var title = ["Smelly Bathroom"]; 

var content = ["I hate the bathroom at work. It's so nasty and dirty all the time."];

var date = [current_timestamp];

// This is an array of the different categories each article will fall under. Free Talk is anything outside the scope of the other categories.
var category = ["Work Hours", "Salary", "Culture", "Customers", "Products", "Staff", "Free Talk"];



var roydon = {
	name: writers[0],
	title: position[3],
	department: department[5],
	full_time: fullTime[1],
};


var royArticle1 = {
	title : title[0],
	content : ,
	date : ,
	author_id : null,
	category_id : null
};

var picPainting2 = {
	title : paintings[0][1],
	img_url : painting_photo[0][1],
	year_made : year_made[0][1],
	artist_id : null	
};



db.create('artists', picasso, function (artist) {
	picPainting1.artist_id = artist.id
	db.create('paintings', picPainting1, function (painting1) {
		picPainting2.artist_id = artist.id
		db.create('paintings', picPainting2, function (painting2) {
			console.log("Picasso worked fine");
		});
	});
});




CREATE TABLE article_changes (
	id SERIAL PRIMARY KEY,
	date_changed TIMESTAMP,
	author_id INTEGER references authors,
	article_id INTEGER references articles
);

