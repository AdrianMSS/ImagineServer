/**
* @description REST Api for the ImagineXYZ Organization
* @author Adrián Sánchez <contact@imaginexyz.com>
*/

var mongo = require('mongodb');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGODB_URI || 
  process.env.MONGOHQ_URL || 
  process.env.MONGOLAB_URI||
  'mongodb://localhost/Hardwarethon';

var db = {};

mongo.MongoClient.connect(uristring, function(err, database) {
  if(!err) {
    db = database;
    console.log('Imagine Connected to the "Hardwarethon_Database" database');
  }
  else{
    console.log(404, 'Imagine Error Connecting to the "Hardwarethon_Database" database');
  }
});


Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

exports.getData = function(req,res) {db.collection('Imagine').find({}, {_id:0}).toArray(function(err, doc){
      if(err) res.send(400, err);
      res.send(200, doc);
  })
}

exports.addSubscribe = function(req,res, email) {
  var now = new Date().addHours(-6);
  db.collection('Subscribe').update({_id:email}, {time:now}, {upsert: true, new: true},function(err, doc) {
    if(err) res.send(400, err);
    res.send(200, true);
  });
}

//POST- CREATE
exports.newData = function(req, res) {
    var resource = req.body;
    resource['date'] = new Date().addHours(-6);
    resource['hour'] = new Date().addHours(-6).getHours();
    resource['minute'] = new Date().addHours(-6).getMinutes();
    db.collection('Imagine').insert(resource, function(error, doc_project){
        if(error) {
            throw error;
            res.send(400, error);
        }
        else{
            res.send(200, resource);
        }
    })
}
