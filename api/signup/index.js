'use strict';

var express = require('express');

var router = express.Router();
const signupController = require('./signup.controller');

router.post('/save', signupController.save);
router.get('/get', signupController.get);
router.post('/remove', signupController.removeUser);
module.exports  =router;
