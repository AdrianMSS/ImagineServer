/**
* @description Module and archives used by the server
* @author Adrián Sánchez <sesamaua@gmail.com>
*/

//Required Modules
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    cronJob = require('cron').CronJob,
    cors = require('cors');

//REST APIS
var  organizationImagine = require('./services/imagine'),
    database = require('./services/database'),
    googleApi = require('./services/google');

/*
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6*/
/*new cronJob('0 59 * * * *', function(){
        //console.log("CronJob")
        organizationImagine.hourScript();
    }, null, true, null);*/
 
var app = express();
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());
//app.use('/hwthon2015', express.static(__dirname + '/hwthon2015'));
app.use(express.static(__dirname + '/webpage'));
app.use('/whatsnear', express.static(__dirname + '/whatsnear'));
app.use('/javisstops', express.static(__dirname + '/javisstops'));
app.use('/grades', express.static(__dirname + '/grades'));

app.get('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/whatsnear/pos', organizationImagine.getData);
app.get('/javisstops/pos', organizationImagine.getData);
app.get('/rentacar/pos', organizationImagine.getData);
app.post('/rentacar/pos', organizationImagine.newData);


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
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

app.post('/email/', function (req, res) {
    var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'sesamaua@gmail.com', // receiver
     subject: 'ImagineXYZ: Desde la pagina web - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '. \n'+ 'Name: ' + req.body['name'] + '. \n'  + 'Message: ' + req.body['message'] // body
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
    var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'sesamaua@gmail.com', // receiver
     subject: 'ImagineXYZ: Susbcripción a la pagina web - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] // body
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

app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');