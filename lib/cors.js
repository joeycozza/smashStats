exports.resolveCors = function (req, res, next) {
	var allowed = {'http://getvicci.com': 'http://getvicci.com',
		'http://beta.getvicci.com': 'http://beta.getvicci.com',
		'http://10.0.0.69:3000': 'http://10.0.0.69:3000',
		'http://10.0.0.58:3000': 'http://10.0.0.58:3000',
		'http://localhost:8080': 'http://localhost:8080',
		'http://localhost:8081': 'http://localhost:8081',
		'http://localhost:8082': 'http://localhost:8082',
		'http://localhost:8083': 'http://localhost:8083',
		'http://localhost:8084': 'http://localhost:8084',
		'http://localhost:8085': 'http://localhost:8085'};

	var referOrigin = req.headers.referer || req.headers.origin;

	if (referOrigin) {
		var thirdSlashIndex = referOrigin.indexOf('/', 8);
		var refererSubStr = referOrigin.substring(0, thirdSlashIndex);
		res.header('Access-Control-Allow-Origin', allowed[refererSubStr]);
	}

	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept');
	next();
};