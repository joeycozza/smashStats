var express = require('express');
var userDB = require('../db/userDB');
var router = express.Router();

/* GET users listing. */
router.get('/', userDB.getAllUsers);
router.get('/:phoneNumber', userDB.getUserByPhoneNumber);
router.put('/', userDB.saveUser);


module.exports = router;
