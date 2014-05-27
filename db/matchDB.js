var mongoose = require('mongoose');
var validCharacters = ['Luigi', 'Mario', 'Donkey Kong', 'Link', 'Samus', 'Captain Falcon',
	'Ness', 'Yoshi', 'Kirby', 'Fox', 'Pikachu', 'Jigglypuff'];
var matchSchema = mongoose.Schema({
	datePlayed: {type: String, required: true},
	winner: {type: String, required: true},
	wStocksLeft: {type: Number, required: true, min: 1, max: 4},
	wChar: {type: String, required: true, enum: validCharacters},
	loser: {type: String, required: true},
	lChar: {type: String, required: true, enum: validCharacters}
});

var MatchModel = mongoose.model('Match', matchSchema);

exports.getAllMatches = function (req, res) {
	MatchModel.find({}, function (err, matches) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(matches);
		}
	});
};

exports.getMatchesByPhoneNumber = function (req, res) {
	var phoneNum = req.body.phoneNum;
	MatchModel.find({$or: [
		{winner: phoneNum},
		{loser: phoneNum}
	]}, function (err, matches) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(matches);
		}
	});
};

exports.getMatchesByCharacter = function (req, res) {
	var char = req.body.char;
	MatchModel.find({$or: [
		{wChar: char},
		{lChar: char}
	]}, function (err, matches) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(matches);
		}
	});
};