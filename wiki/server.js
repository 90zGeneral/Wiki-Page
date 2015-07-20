// Loading all our Node Package Modules
var express        = require('express');
var logger         = require('morgan');
var path           = require('path');
var exphbs         = require('express-handlebars');
var bodyParser     = require('body-parser');
var fs 			   = require('fs');
var methodOverride = require('method-override');
var db             = require('./db.js');

var app = express();

// Setting up handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Allows us to use req.body
app.use(bodyParser.urlencoded({extended: true}));
// Loads static files
app.use(express.static('public'));
app.use(logger('dev'));

// Allows us to use methods PUT and DELETE for forms
app.use(methodOverride(function (req, res) {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   // look in urlencoded POST bodies and delete it
   var method = req.body._method;
   delete req.body._method;
   return method;
 }
}));

// Allows me to use controllers to render the routes for each table in my database
fs.readdirSync('./controllers').forEach(function (file) {
 if(file.substr(-3) == '.js') {
     route = require('./controllers/' + file);
     route.controller(app);
 }
});


// Set express to listen to localhost 3000
app.listen(3000);


//Root Route
app.get('/', function (req, res) {
	res.render('home');
});


app.get('/contacts', function (req, res) {
	res.render('contacts');
});

app.get('/about_us', function (req, res) {
	res.render('about_us');
});


