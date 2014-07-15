var mongoose = require('mongoose');
var fakeData = require('./fakeData');
var utils = require('../lib/utils');

var validCharacters = ['Luigi', 'Mario', 'Donkey Kong', 'Link', 'Samus', 'Captain Falcon',
	'Ness', 'Yoshi', 'Kirby', 'Fox', 'Pikachu', 'Jigglypuff'];

var matchSchema = mongoose.Schema({
	datePlayed: {type: String, required: true},
	winner: {type: String, required: true, ref: 'User'},
	wStocksLeft: {type: Number, required: true, min: 1, max: 4},
	wChar: {type: String, required: true, enum: validCharacters},
	loser: {type: String, required: true, ref: 'User'},
	lChar: {type: String, required: true, enum: validCharacters}
});

var MatchModel = mongoose.model('Match', matchSchema);

exports.getMatchModel = function () {
	return MatchModel;
};

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


exports.saveMatch = function (req, res) {
	var newMatch = new MatchModel({
		datePlayed: Date.now() + '',
		winner: req.body.winner,
		wStocksLeft: req.body.wStocksLeft,
		wChar: req.body.wChar,
		loser: req.body.loser,
		lChar: req.body.lChar
	});

	newMatch.save(function (err, savedMatch) {
		if (err) {
			console.log('Error saving match to DB');
			console.log(err);
			res.send(500);
		} else {
			res.send(savedMatch);
		}
	});
};

if (!utils.isInTestMode()) {
	MatchModel.find({}, function (err, matches) {
		if (err) {
			console.log(err);
			return;
		}
		if (matches.length === 0) {
			var match1 = new MatchModel(fakeData.getMatch1());
			var match2 = new MatchModel(fakeData.getMatch2());
			match1.datePlayed = Date.now();
			match2.datePlayed = Date.now() + 500;
			match1.save();
			match2.save();
		}
	});
}