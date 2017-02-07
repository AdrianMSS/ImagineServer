/**
* @description Module and archives used by the server
* @author Adrián Sánchez <sesamaua@gmail.com>
*/


var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');
 
var organizationImagine = require('./services/imagine');

var app = express();

 
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());
app.use(express.static(__dirname+'/webpage/bert.house/en'));

var generator = require('xoauth2').createXOAuth2Generator({
    user: 'adriansanchez.logn',
    clientId: '980433155755-adpdvti4k47c8elkor63181u34e71u0m.apps.googleusercontent.com',
    clientSecret: 'Wrx6qdcv2l4AqRj0X7eJUqRf',
    refreshToken: '1/kfGGuqSGP7q2TEKkPBHXHkN8H3Km9AjTF9Nqg-OiYUc',
    accessToken: 'ya29.swHEs_vuQz2ZWDxkVJI1gpTMOKiFTVquopDydk_SVLoUcUGeBFxpNGAgfeVhRPstOtmj' // optional
});

generator.on('token', function(token){
});

var transporter = nodemailer.createTransport(({
    transport: 'SMTP',
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

//Función para el manejo de la zona horaria
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

app.post('/email/', function (req, res) {
    var fecha = new Date().addHours(-6).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'contact@imaginexyz.com', // receiver
     subject: 'ImagineXYZ: WebPage Message - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '. \n'+ 'Name: ' + req.body['name'] + '. \n'+ 'Subject: ' + req.body['subject'] + '. \n'+ 'Message: ' + req.body['message'] // body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      res.send(200);
    }
  });
});

app.post('/susbscribe/', function (req, res) {
    var fecha = new Date().addHours(-6).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'contact@imaginexyz.com', // receiver
     subject: 'ImagineXYZ: Subscription - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '\n Name: '+ req.body['name']// body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      organizationImagine.addSubscribe(req, res, req.body.email);
    }
  });
});
app.post('/es/email/', function (req, res) {
    var fecha = new Date().addHours(-6).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'contact@imaginexyz.com', // receiver
     subject: 'ImagineXYZ: Mensaje de la Página Web - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '. \n'+ 'Name: ' + req.body['name'] + '. \n'+ 'Message: ' + req.body['message'] // body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      res.send(200);
    }
  });
});

app.post('/es/susbscribe/', function (req, res) {
    var fecha = new Date().addHours(-6).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'contact@imaginexyz.com', // receiver
     subject: 'ImagineXYZ: Susbcripción - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '\n Name: '+ req.body['name']// body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      organizationImagine.addSubscribe(req, res, req.body.email);
    }
  });
});
app.post('/fr/email/', function (req, res) {
    var fecha = new Date().addHours(-6).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'contact@imaginexyz.com', // receiver
     subject: 'ImagineXYZ: Le Message - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '. \n'+ 'Name: ' + req.body['name'] + '. \n'+ 'Message: ' + req.body['message'] // body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      res.send(200);
    }
  });
});

app.post('/fr/susbscribe/', function (req, res) {
    var fecha = new Date().addHours(-6).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'contact@imaginexyz.com', // receiver
     subject: 'ImagineXYZ: Susbcripción Francés - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '\n Name: '+ req.body['name']// body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      organizationImagine.addSubscribe(req, res, req.body.email);
    }
  });
});

var remora = {};
hex2a = function(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

app.post('/remora/', function (req, res) {
    console.log('post');
    console.log(req.body);
    remora = req.body;
    remora.data = hex2a(remora.data);
    res.send(200,remora);
});

app.get('/remora/', function (req, res) {
    console.log('get');
    res.send(200,remora);
});

app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');
