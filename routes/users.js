var express = require('express');
var userDB = require('../db/userDB');
var router = express.Router();

/* GET users listing. */
router.post('/user', userDB.getUserByPhoneNumber);
router.put('/', userDB.saveUser);

module.exports = router;
