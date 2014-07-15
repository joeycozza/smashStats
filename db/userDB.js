var mongoose = require('mongoose');
var MatchModel = require('./matchDB').getMatchModel();
var fakeData = require('./fakeData');
var utils = require('../lib/utils');

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

exports.getAllUsers = function (req, res) {
	UserModel.find({}, function (err, users) {
		res.send(users);
	});
};

exports.getUserByPhoneNumber = function (req, res) {
	var phoneNumber = req.params.phoneNumber;
	if (phoneNumber === undefined) {
		res.send(400);
		return;
	}
	UserModel.findById(phoneNumber, function (err, user) {
		if (err) {
			console.log(err);
			res.send(500);
		} else if (user) {

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
		} else {
			res.send(404);
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

if (!utils.isInTestMode()) {
	UserModel.find({}, function (err, users) {
		if (err) {
			console.log(err);
			return;
		}
		if (users.length === 0) {
			var user1 = new UserModel(fakeData.getDaBest());
			var user2 = new UserModel(fakeData.getTesty());
			var user3 = new UserModel(fakeData.getYoMama());
			user1.save();
			user2.save();
			user3.save();
		}
	});
}