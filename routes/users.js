var express = require('express');
var userDB = require('../db/userDB');
var router = express.Router();

/* GET users listing. */
router.get('/', userDB.getUsers);

module.exports = router;
