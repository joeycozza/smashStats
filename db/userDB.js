var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: {type: String, required: true},
	phoneNumber: {type: String, required: true, unique: true},
	pictureUrl: {type: String, required: true},
	matchesWon: [{type:String, ref:'Match'}],
	matchesLost: [{type:String, ref:'Match'}]
});

var UserModel = mongoose.model('User', userSchema);

exports.getUserModel = function() {
	return UserModel;
};

exports.getAllUsers = function (req, res) {

	UserModel
		.find({})
		.populate({path:'matchesWon', match:{winner:this.phoneNumber}})
		.populate({path:'matchesLost', match:{loser:this.phoneNumber}})
		.exec(function (err, users) {
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
	UserModel.find({phoneNumber: phoneNum}, function (err, users) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(users);
		}
	});
};

exports.saveUser = function (req, res) {
	var newUser = new UserModel({name: req.body.name,
		phoneNumber: req.body.phoneNumber,
		pictureUrl: req.body.pictureUrl});
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