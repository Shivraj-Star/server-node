'use strict';
let array = [{
  name: "raj",
  message: "Hi"
}, {
  name: "prasad",
  message: "How r u?"
}, {
  name: "viren",
  message: "nice"
}, ];

exports.list = function(req, res) {
  res.status(200).json(array);
}

exports.save = function(io) {
  return function(req, res) {
    array.push(req.body);
    console.log("req.body", req.body);
    console.log("array", array);
    io.sockets.emit('updatelist', array);
    res.status(200).json("success");
  }
}
