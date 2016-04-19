'use strict';

 const mongoose = require('mongoose');
 var schema = new mongoose.Schema({
    first: 'string',
    last: 'string',
    email: 'string',
    contact: 'string',
    password: 'string',
    city: 'string'
   });
module.exports = mongoose.model('user', schema);
