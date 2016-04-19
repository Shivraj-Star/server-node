'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var favicon = require('serve-favicon');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let session  = require('express-session');
let errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var array =[];

// usernames which are currently connected to the chat
var usernames = {};

io.on('connection', function(socket){
  console.log('user is connected online now');

  socket.on('join:room', function(data){
      var room_name = data.room_name;
      socket.join(room_name);
      console.log(data.user +' joined room ' + room_name + 'with id  ' + socket.id);
  });


  socket.on('leave:room', function(msg){
      msg.text = msg.user + " has left the group " +msg.room;
      console.log(msg.text);
      socket.in(msg.room).emit('exit', msg);
      socket.leave(msg.room);
  });


  socket.on('sendMessage', function(msg){
    console.log('Received message from room is ' + msg.room+ ' messsage is '+ msg.text);
      io.sockets.in(msg.room).emit('message', msg);
  });


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

app.use(morgan('dev'));
app.use(cookieParser('starkey'));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'starkey',
  resave: true,
  saveUninitialized: true
}))
app.use(errorHandler()); // Error handler - has to be last

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
});


var router = express.Router();

let routers = require('./router')
let config = require('./config');
require('./stateRoute')(app,io);

// Router middleware, mentioned it before defining routes.
// router.use(function(req, res, next) {
// console.log("/" + req.method);
//   next();
// });
routers(router);

app.use('/api', router);


mongoose.connect('mongodb://localhost/mean-dev');
http.listen(config.port, function() {
  console.log(config.message);
})
