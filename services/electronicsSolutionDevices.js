/**
* @description REST Api for the ElectronicsSolutionDevices team
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
        console.log('ElectronicsSolutionDevices Team Connected to the "Hardwarethon_Database" database');
    }
    else{
        console.log(404, 'ElectronicsSolutionDevices Team Error Connecting to the "Hardwarethon_Database" database');
    }
});


exports.newData = function(req,res) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString="logs.post."+now+'.ElectronicsSolutionDevices',
        newQuery = {};
    newQuery[dateString]=1;
    newQuery["indexes.ElectronicsSolutionDevices"]=1;
    
    db.collection('HardwarethonInfo').findAndModify({},{},{$inc:newQuery} , {upsert: true, new: true}, function(err, doc_ids){
        db.collection('ElectronicsSolutionDevices').insert(req.query, function(err, doc){
            if(err) res.send(400, err);
            res.send(200, {"info":"Datos insertados correctamente."});
        })
    })
}

exports.getData = function(req,res) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString="logs.get."+now+'.ElectronicsSolutionDevices',
        newQuery = {};
    newQuery[dateString]=1;

    db.collection('HardwarethonInfo').findAndModify({},{}, {$inc: newQuery}, {upsert: true, new: true}, function(err, doc_ids){
        db.collection('ElectronicsSolutionDevices').find({}, {_id:0}).toArray(function(err, doc){
            if(err) res.send(400, err);
            res.send(200, doc);
        })
    })
}