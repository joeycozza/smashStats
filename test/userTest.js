var supertest = require('supertest');
var app = require('../app');
var assert = require('should');
var userDB = require('../db/userDB');
var UserModel = userDB.getUserModel();
var fakeData = require('../db/fakeData');

function emptyUserDB(done) {
	//delete all experiences from collection
	UserModel.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
		done();
	});
}

before(function (done) {
	emptyUserDB(done);
});

describe('Saving A User', function () {

	it('Initially User Collection should be empty', function (done) {
		supertest(app)
			.get('/users/')
			.expect(200)
			.end(function (err, response) {
				response.should.have.status(200);
				response.body.length.should.equal(0);
				done();
			});
	});

	it('Save a Single User', function (done) {
		supertest(app)
			.put('/users/')
			.expect(200)
			.send({name: 'Joey Test',
				phoneNumber: '9999999999',
				pictureUrl: 'http://fotozup.com/wp-content/uploads/2013/04/funny-mugshots-002.jpg'})
			.end(function (err, response) {
				response.should.have.status(200);
				response.body.should.have.keys('name','phoneNumber','pictureUrl', '_id', '__v');
				done();
			});
	});

	it('User Collection should have 1 user saved now', function (done) {
		supertest(app)
			.get('/users/')
			.expect(200)
			.end(function (err, response) {
				response.should.have.status(200);
				response.body.length.should.equal(1);
				done();
			});
	});


});