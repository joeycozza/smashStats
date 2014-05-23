var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: {type: String, required: true},
	phoneNumber: {type: String, required: true, unique: true},
	pictureUrl: {type: String, required: true}
});

var UserModel = mongoose.model('User', userSchema);

exports.getAllUsers = function (req, res) {
	UserModel.find({}, function (err, users) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(users);
		}
	});
};

exports.getUserByPhoneNumber = function (req, res) {
	var phoneNum = req.body.phoneNum;
	UserModel.find({phoneNumber:phoneNum}, function (err, users) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(users);
		}
	});
};