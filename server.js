var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var utils = require('./lib/utils');
var cors = require('./lib/cors');

var configJSON = require('./config.json');

var routes = require('./routes/index');
var users = require('./routes/users');
var matches = require('./routes/matches');


var mongoose = require('mongoose');

mongoose.connect(configJSON[utils.getEnvironment()].dbHost);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function () {
	console.log('Mongoose connected to Smash MongoDB');
});


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(cors.resolveCors);
app.use('/', routes);
app.use('/users', users);
app.use('/matches', matches);

module.exports = app;
app.set('port', process.env.PORT || 3000);

if (!utils.isInTestMode()) {
	http.createServer(app).listen(app.get('port'), function printExpressPort() {
		console.log('Express server listening on port ' + app.get('port'));
	});
}
