var app = require('./app');
var mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://localhost/smash');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function () {
	console.log('Mongoose connected to Smash MongoDB');
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
