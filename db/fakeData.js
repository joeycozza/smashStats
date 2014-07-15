var curDate = Date.now();

var testy = {
	_id: '9999999999',
	name: 'Testy McTester',
	phoneNumber: '9999999999',
	pictureUrl: 'http://img.gmw.cn/images/attachement/jpg/site2/20120927/eca86ba0526e11cdfd4830.jpg'
};

var yoMama = {
	_id: '6236284166',
	name: 'Yo Mama',
	phoneNumber: '6236284166',
	pictureUrl: 'http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/47/7b/1357772393_2651_CrazyFaceHarrisonKeelyStock.jpg?itok=PL2Vw0nS'
};

var daBest = {
	_id: '0987654321',
	name: 'Da Best',
	phoneNumber: '0987654321',
	pictureUrl: 'http://www.newbornbabyzone.com/wp-content/uploads/2010/08/wacky-baby-names.jpg'
};
exports.getTesty = function () {
	return testy;
};
exports.getYoMama = function () {
	return yoMama;
};
exports.getDaBest = function () {
	return daBest;
};
exports.getFakeUsers = function () {
	return [testy, yoMama, daBest];
};


var match1 = {
	winner: testy.phoneNumber,
	wStocksLeft: 2,
	wChar: 'Fox',
	loser: daBest.phoneNumber,
	lChar: 'Fox'
};
var match2 = {
	winner: daBest.phoneNumber,
	wStocksLeft: 1,
	wChar: 'Fox',
	loser: testy.phoneNumber,
	lChar: 'Luigi'
};

exports.getMatch1 = function () {
	return match1;
};

exports.getMatch2 = function () {
	return match2;
};

exports.getFakeMatches = function () {
	return [
		match1, match2,
		{
			datePlayed: curDate + '',
			winner: '6236284166',
			wStocksLeft: 3,
			wChar: 'Mario',
			loser: '1234567890',
			lChar: 'Pikachu'
		},
		{
			datePlayed: curDate + '',
			winner: '6236284166',
			wStocksLeft: 2,
			wChar: 'Jigglypuff',
			loser: '0987654321',
			lChar: 'Samus'
		},
		{
			datePlayed: curDate + '',
			winner: '0987654321',
			wStocksLeft: 2,
			wChar: 'JigglyPuff',
			loser: '6236284166',
			lChar: 'Kirby'
		},
		{
			datePlayed: curDate + '',
			winner: '0987654321',
			wStocksLeft: 4,
			wChar: 'Jigglypuff',
			loser: '6236284166',
			lChar: 'Yoshi'
		},
		{
			datePlayed: curDate + '',
			winner: '0987654321',
			wStocksLeft: 1,
			wChar: 'Jigglypuff',
			loser: '6236284166',
			lChar: 'Yoshi'
		},
		{
			datePlayed: curDate + '',
			winner: '0987654321',
			wStocksLeft: 3,
			wChar: 'Jigglypuff',
			loser: '6236284166',
			lChar: 'Yoshi'
		},
		{
			datePlayed: curDate + '',
			winner: '0987654321',
			wStocksLeft: 2,
			wChar: 'Jigglypuff',
			loser: '6236284166',
			lChar: 'Yoshi'
		}
	];

};