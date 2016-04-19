/* global module */

'use strict';

var express = require('express');
var controller = require('./chat.controller');

var router = express.Router();

module.exports  = function(io) {
  router.get('/getlist', controller.list);
  router.post('/savelist', controller.save(io));
  return router;
};
