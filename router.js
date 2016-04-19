'use strict';

var Joi = require('joi');
let nodemailer = require('nodemailer');
var fs = require('fs');

module.exports = function(router) {
  router.get('/mail', function(req, res) {
    let smtpTransport = nodemailer.createTransport("SMTP", {
      service: 'gmail',
      auth: {
        user: 'padwal.balwant@gmail.com',
        pass: 'shree555#'
      }
    });
    var data = fs.readFileSync('./resume.docx');
    //console.log("Synchronous read: " + data.toString());

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: "padwal.balwant@gmail.com", // sender address
      to: "varsh08@gmail.com", // list of receivers
      subject: "Offer Letter from Connizant", // Subject line
      text: "Please sen your Bank ID and password to join process.", // plaintext body
      html: "<b>welcomr to Angular</b><br/><small>This is content of this html page</small>",
      attachments: [{ // stream as an attachment
        fileName: "text4.docx",
        streamSource: fs.createReadStream("./resume.docx")
      }]

    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error);
        res.send('Error hello world').status(500);

      } else {
        res.send(data).status(200);
        console.log("Message sent: " + response.message);
      }

      // if you don't want to use this transport object anymore, uncomment following line
      smtpTransport.close(); // shut down the connection pool, no more messages
    });
    //  res.send('hello world');

  });

  router.get('/getUser', function(req, res) {
    let result = {
      cookies: req.cookies,
      session: req.session
    }
    res.status(200).json(result);
  });

  router.post('/saveuser', function(req, res) {
    req.session.name = req.body.name;
    res.status(200).json(req.session);
  });

  router.post('/save', function(req, res) {
    console.log(req.body);
    var schema = Joi.object().keys({
      username: Joi.string().required(),
      contact: Joi.number().min(2).required(),
      isActive: Joi.boolean().required()
    })
    Joi.validate(req.body, schema, function(err, value) {
      if (err) {
        console.log('err', err)
        res.status(500).json(err);
      } else {
        // console.log('res', req.body)
        res.status(200).json(req.body);
      }
    })
  })
}
