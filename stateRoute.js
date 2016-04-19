'use strict';


module.exports = function (app,io) {
  app.use('/api/chat', require('./api/chat')(io));
  app.use('/api/load', require('./api/load'));
    app.use('/api/user', require('./api/signup'));
}
