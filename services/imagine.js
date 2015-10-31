/**
* @description REST Api for the ImagineXYZ Organization
* @author Adrián Sánchez <contact@imaginexyz.com>
*/

var mongo = require('mongodb');
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/Hardwarethon';


Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

mongo.MongoClient.connect(uristring, function(err, database) {
  if(!err) {
    db = database;
    console.log('Imagine Connected to the "Hardwarethon_Database" database');
  }
  else{
    console.log(404, 'Imagine Error Connecting to the "Hardwarethon_Database" database');
  }
});


exports.getData = function(req,res) {db.collection('Imagine').find({}, {_id:0}).toArray(function(err, doc){
      if(err) res.send(400, err);
      res.send(200, doc);
  })
}

nmeaTOgps = function(pos, type){
  var x = 0,
    mop = 1;
  if(parseFloat(pos)<0){
    x = 1;
    mop = -1;
  }
  if(type===1){
    var y=1;
    if(pos.split('.')[0].length===4)y=2;
    var dd = parseInt(pos.slice(0+x,y+x)),
      mm = parseFloat(pos.slice(y+x)),
      latitude = (dd + (mm / 60)) * mop;
      return latitude;
  }
  if(type===2){
    var ddd = parseInt(pos[0+x]+pos[1+x]),
      mm = parseFloat(pos.slice(2+x)),
      latitude = (ddd + (mm / 60)) * mop;
      return latitude;
  }
}

exports.newData = function(req,res) {
  var resource = req.query;
  resource['Date'] = new Date().addHours(-6);

  var key = 'AIzaSyBGuNB7PRusaF7JKSq-t_crKWKP6H3o3sg',
    lat = nmeaTOgps(req.query.lat, 1),
    longi = nmeaTOgps(req.query.long, 2),
    v = req.query.v;

  var radius = 50;

  var https = require('https');
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + lat + ',' + longi + "&radius=" + radius;
    console.log(url);
  https.get(url, function(response) {
    var body ='';
    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      console.log(body);
      var places = JSON.parse(body);
      var locations = places.results;
      //console.log(locations);
      var randLoc = locations[Math.floor(Math.random() * locations.length)];
      if(randLoc !== undefined) {resource['chanteCerca'] = randLoc.name;}
      else {resource['chanteCerca'] = 'Nada Conocido';}
      resource['lat'] = lat;
      resource['long'] = longi;
      db.collection('Imagine').insert(resource, function(err, doc){
        if(err) res.send(400, err);
        res.send(200, resource);
      });
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}


/*exports.hourScript = function(){
  var newQuery = {},
    teamsArray = ['ElectronicsSolutionDevices','Bulldozer','OvejasElectricas','SmarTicos','InnovationSourceCode',
    'Envitech','Neotronic','InfotronicCircuits','Float','InDePro','LaNaranjaMecanica','FrozenbyteKnights','Iwa',
    'TeamCR','NovaMakers','A','WIN','X','Y','Z'],
    now = new Date();

  now.setHours( now.getHours() - 5 );
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  teamsArray.forEach(function(obj){
    var postString="logs.post."+now+'.'+obj,
      getString="logs.get."+now+'.'+obj;
    newQuery[postString]=0;
    newQuery[getString]=0;
  });

  db.collection('HardwarethonInfo').update({}, {$set:newQuery},function(err, doc){
    if(err) console.log(err);
    console.log(doc);
  })
}*/