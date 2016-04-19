'use strict';

var express = require('express');

var router = express.Router();
const loadController = require('./load.controller');

router.post('/save', loadController.save);
module.exports  =router;
