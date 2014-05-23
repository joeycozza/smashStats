var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({
	datePlayed: {type: String, required: true},
	winner: {type: String, required: true},
	wStocksLeft: {type: Number, required: true},
	wChar: {type: String, required: true},
	loser: {type: String, required: true},
	lChar: {type: String, required: true}
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
	MatchModel.find({$or:[{winner:phoneNum}, {loser:phoneNum}]}, function (err, matches) {
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
	MatchModel.find({$or:[{wChar:char}, {lChar:char}]}, function (err, matches) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(matches);
		}
	});
};