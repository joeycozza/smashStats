var supertest = require('supertest');
var app = require('../app');
var assert = require('should');
var matchDB = require('../db/matchDB');
var MatchModel = matchDB.getMatchModel();
var fakeData = require('../db/fakeData');

function emptyMatchDB(done) {
	MatchModel.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
		done();
	});
}

before(function (done) {
	emptyMatchDB(done);
});

after(function (done) {
	emptyMatchDB(done);
});

describe('Testing our Matches', function () {

	it('Match DB should be empty', function (done) {
		supertest(app)
			.get('/matches')
			.expect(200)
			.end(function (err, res) {
				res.body.length.should.equal(0);
				res.should.have.status(200);

				done();
			});

	});


});