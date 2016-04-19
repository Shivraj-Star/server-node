'use strict';
const signupModel = require('./signup.model');


exports.save = function (req, res) {

	var load = new signupModel(req.body);
	console.log("sign up requst", req.body);
	load.save(function (err) {
		if (err) {
			res.status(500).json({
				"err": err
			});
		} else {
			signupModel.find({}, function (err, data) {
				if (err) {
					res.status(500).json({
						"err": err
					});
				} else {
					res.status(200).json(data);
				}
			});
		}
	});
};

exports.get = function (req, res) {
	signupModel.find({}, function (err, data) {
		if (err) {
			res.status(500).json({
				"err": err
			});
		} else {
			res.status(200).json(data);
		}
	})
}

exports.removeUser = function (req, res) {
	console.log(req.body);
	signupModel.remove({ _id: req.body.id }, function (err, data) {
		if (err) {
			res.status(500).json({
				"err": err
			});
		} else {
			signupModel.find({}, function (err, data) {
				if (err) {
					res.status(500).json({
						"err": err
					});
				} else {
					res.status(200).json(data);
				}
			});
		}
	})
}
