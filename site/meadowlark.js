var express = require('express');

var app = express();

//hanlebars
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

//home
app.get('/', function(req, res){
	res.render('home');
});

//about
var fortunes = [
	"111111",
	"222222",
	"333333",
	"444444",
	"555555",
];
app.get('/about', function(req, res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
});

//404
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

//500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port'));
});