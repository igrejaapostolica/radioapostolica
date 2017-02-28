var http = require('http');
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(
	sassMiddleware({
		root: __dirname,
    	src: '/public/sass',
    	dest: '/public/css',
    	debug: true,
    	outputStyle: 'compressed',
    	prefix: '/css'
	})
);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/status', function(request, response) {
  http.get({ host: "72.55.156.247", port: 9910, path: "/stats?sid=1&json=1" }, function(resp) {
    var body = '';
    resp.on('data', function(d) {
      body += d;
    });
    resp.on('end', function() {
      response.json(JSON.parse(body));
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});