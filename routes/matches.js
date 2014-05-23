var express = require('express');
var matchDB = require('../db/matchDB');
var router = express.Router();

/* GET matches listing. */
router.get('/', matchDB.getMatches);

module.exports = router;
