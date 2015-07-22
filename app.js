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
    floatTeam = require('./services/float'),
    electronicsTeam = require('./services/electronicsSolutionDevices'),
    bulldozerTeam = require('./services/bulldozer'),
    ovejasTeam = require('./services/ovejasElectricas'),
    smarTicosTeam = require('./services/smarTicos'),
    innovationTeam = require('./services/innovationSourceCode'),
    envitechTeam = require('./services/envitech'),
    neotronicTeam = require('./services/neotronic'),
    infotronicTeam = require('./services/infotronicCircuits'),
    inDeProTeam = require('./services/inDePro'),
    naranjaTeam = require('./services/laNaranjaMecanica'),
    frozenbyteTeam = require('./services/frozenbyteKnights'),
    iwaTeam = require('./services/iwa'),
    crTeam = require('./services/cr'),
    novaTeam = require('./services/novaMakers'),
    aTeam = require('./services/a'),
    winTeam = require('./services/win'),
    xTeam = require('./services/x'),
    yTeam = require('./services/y'),
    zTeam = require('./services/z');
 

/*
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6*/
new cronJob('0 59 * * * *', function(){
        //console.log("CronJob")
        organizationImagine.hourScript();
    }, null, true, null);
 
var app = express();
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());
app.use('/hwthon2015', express.static(__dirname + '/hwthon2015'));
app.use(express.static(__dirname + '/webpage'));

/*app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin');
  next();
});*/

app.get('/hwthon2015/Imagine/', cors(), organizationImagine.getData);
app.post('/hwthon2015/Imagine/', organizationImagine.newData);

app.post('/Float/', floatTeam.newData);
app.get('/Float/', floatTeam.getData);

app.post('/ElectronicsSolutionDevices/', electronicsTeam.newData);
app.get('/ElectronicsSolutionDevices/', electronicsTeam.getData);

app.post('/Bulldozer/', bulldozerTeam.newData);
app.get('/Bulldozer/', bulldozerTeam.getData);

app.post('/OvejasElectricas/', ovejasTeam.newData);
app.get('/OvejasElectricas/', ovejasTeam.getData);

app.post('/SmarTicos/', smarTicosTeam.newData);
app.get('/SmarTicos/', smarTicosTeam.getData);

app.post('/InnovationSourceCode/', innovationTeam.newData);
app.get('/InnovationSourceCode/', innovationTeam.getData);

app.post('/Envitech/', envitechTeam.newData);
app.get('/Envitech/', envitechTeam.getData);

app.post('/Neotronic/', neotronicTeam.newData);
app.get('/Neotronic/', neotronicTeam.getData);

app.post('/InfotronicCircuits/', infotronicTeam.newData);
app.get('/InfotronicCircuits/', infotronicTeam.getData);

app.post('/InDePro/', inDeProTeam.newData);
app.get('/InDePro/', inDeProTeam.getData);

app.post('/LaNaranjaMecanica/', naranjaTeam.newData);
app.get('/LaNaranjaMecanica/', naranjaTeam.getData);

app.post('/FrozenbyteKnights/', frozenbyteTeam.newData);
app.get('/FrozenbyteKnights/', frozenbyteTeam.getData);

app.post('/Iwa/', iwaTeam.newData);
app.get('/Iwa/', iwaTeam.getData);

app.post('/TeamCR/', crTeam.newData);
app.get('/TeamCR/', crTeam.getData);

app.post('/NovaMakers/', novaTeam.newData);
app.get('/NovaMakers/', novaTeam.getData);

app.post('/ATeam/', aTeam.newData);
app.get('/ATeam/', aTeam.getData);

app.post('/WIN/', winTeam.newData);
app.get('/WIN/', winTeam.getData);

app.post('/X/', xTeam.newData);
app.get('/X/', xTeam.getData);

app.post('/Y/', yTeam.newData);
app.get('/Y/', yTeam.getData);

app.post('/Z/', zTeam.newData);
app.get('/Z/', zTeam.getData);

var generator = require('xoauth2').createXOAuth2Generator({
    user: 'adriansanchez.logn',
    clientId: '980433155755-adpdvti4k47c8elkor63181u34e71u0m.apps.googleusercontent.com',
    clientSecret: 'Wrx6qdcv2l4AqRj0X7eJUqRf',
    refreshToken: '1/kfGGuqSGP7q2TEKkPBHXHkN8H3Km9AjTF9Nqg-OiYUc',
    accessToken: 'ya29.swHEs_vuQz2ZWDxkVJI1gpTMOKiFTVquopDydk_SVLoUcUGeBFxpNGAgfeVhRPstOtmj' // optional
});

generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
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
     text: 'Email: ' + req.body['email'] + '. \n'+ 'Name: ' + req.body['name'] + '. \n' + 'Subject: ' + req.body['subject'] + '. \n' + 'Message: ' + req.body['message'] // body
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

app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');