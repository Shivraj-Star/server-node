'use strict';
const loadModel = require('./load.model');


exports.save = function(req, res) {

var load =new loadModel(req.body);
console.log("bodyy",req.body);
load.save(function (err) {
  if(err){
    res.status(500).json({"err":err});
  }
  else{
    res.status(200).json("success");

  }
});
};
