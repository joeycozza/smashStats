var supertest = require('supertest');
var app = require('../server');
var assert = require('should');
var userDB = require('../db/userDB');
var UserModel = userDB.getUserModel();
var MatchModel = require('../db/matchDB').getMatchModel();
var fakeData = require('../db/fakeData');

function emptyDBs(done) {
	UserModel.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
		MatchModel.remove({}, function (err) {
			if (err) {
				console.log(err);
			}
			done();
		});
	});
}

before(function (done) {
	emptyDBs(done);
});

after(function (done) {
	emptyDBs(done);
});

describe('Saving A User', function () {

	it('Save a Single User', function (done) {
		supertest(app)
			.put('/users/')
			.expect(200)
			.send({name: 'Joey Test',
				phoneNumber: '9999999999',
				pictureUrl: 'http://fotozup.com/wp-content/uploads/2013/04/funny-mugshots-002.jpg'})
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.should.have.keys('name', 'phoneNumber', 'pictureUrl', '_id', '__v');
				done();
			});
	});

	it('Getting the saved user by phonenumber', function (done) {
		supertest(app)
			.post('/users/user')
			.send({phoneNumber: '9999999999'})
			.expect(200)
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.should.have.keys('name', 'phoneNumber', 'pictureUrl', '_id', '__v', 'matches');
				res.body.name.should.equal('Joey Test');
				res.body.matches.length.should.equal(0);
				done();
			});
	});


	it('Save Another User', function (done) {
		supertest(app)
			.put('/users/')
			.expect(200)
			.send(fakeData.getDaBest())
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.should.have.keys('name', 'phoneNumber', 'pictureUrl', '_id', '__v');
				done();
			});
	});

	it('Test adding a match', function (done) {

		supertest(app)
			.put('/matches/')
			.expect(200)
			.send(fakeData.getMatch1())
			.end(function (err, res) {
				console.log(res.body);
				done();
			});

	});


	it('Getting the saved user by phonenumber', function (done) {
		supertest(app)
			.post('/users/user')
			.send({phoneNumber: '9999999999'})
			.expect(200)
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.should.have.keys('name', 'phoneNumber', 'pictureUrl', '_id', '__v', 'matches');
				res.body.name.should.equal('Joey Test');
				res.body.matches.length.should.equal(1);
				done();
			});
	});

	it('Getting the saved user by phonenumber', function (done) {
		supertest(app)
			.post('/users/user')
			.send({phoneNumber: fakeData.getDaBest().phoneNumber})
			.expect(200)
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.should.have.keys('name', 'phoneNumber', 'pictureUrl', '_id', '__v', 'matches');
				res.body.name.should.equal(fakeData.getDaBest().name);
				res.body.matches.length.should.equal(1);
				done();
			});
	});


});