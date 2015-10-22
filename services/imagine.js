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

exports.newData = function(req,res) {
  var resource = req.query;
  resource['Date'] = new Date();
  db.collection('Imagine').insert(resource, function(err, doc){
    if(err) res.send(400, err);
    res.send(200, resource);
  })
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