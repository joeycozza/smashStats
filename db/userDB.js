var mongoose = require('mongoose');
var MatchModel = require('./matchDB').getMatchModel();

var userSchema = mongoose.Schema({
	_id: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	phoneNumber: {type: String, required: true, unique: true},
	pictureUrl: {type: String, required: true}
});

var UserModel = mongoose.model('User', userSchema);

exports.getUserModel = function () {
	return UserModel;
};

exports.getUserByPhoneNumber = function (req, res) {
	var phoneNumber = req.body.phoneNumber;
	UserModel.findOne({phoneNumber: phoneNumber}, function (err, user) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {

			//go grab the matches and put it in the user here
			MatchModel.find({$or: [
				{winner: phoneNumber},
				{loser: phoneNumber}
			]}, function (err, matches) {
				if (err) {
					console.log(err);
					res.send(500);
				} else {
					user._doc.matches = matches;
					res.send(user);
				}
			});
		}
	});
};

exports.saveUser = function (req, res) {
	var newUser = new UserModel({
		_id: req.body.phoneNumber,
		name: req.body.name,
		phoneNumber: req.body.phoneNumber,
		pictureUrl: req.body.pictureUrl
	});
	newUser.save(function (err, savedUser) {
		if (err) {
			console.log('Error saving user to DB');
			console.log(err);
			res.send(500);
		} else {
			res.send(savedUser);
		}
	});
};