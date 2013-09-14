/**
 * Module dependencies.
 */

var express = require('express');
var playlist = require('./routes/playlist');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var index = function(req, res) {
	fs = require('fs');
	fs.readFile('public/player.html', function(err, data) {
		res.setHeader('Content-Type', 'text/html');
		res.send(data);
	});
};

app.get('/', index);

app.get('/playlist', playlist.get);
app.put('/playlist/:id/:requestedBy', playlist.put);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});