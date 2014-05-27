var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var matches = require('./routes/matches');
var utils = require('./lib/utils');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/smash');
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
app.use(utils.resolveCors);
app.use('/', routes);
app.use('/users', users);
app.use('/matches', matches);

module.exports = app;
