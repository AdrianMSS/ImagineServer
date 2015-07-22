/**
* @description REST Api for the Z team
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
        console.log('Z Team Connected to the "Hardwarethon_Database" database');
    }
    else{
        console.log(404, 'Z Team Error Connecting to the "Hardwarethon_Database" database');
    }
});


exports.newData = function(req,res) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString="logs.post."+now+".Z",
        newQuery = {};
    newQuery[dateString]=1;
    newQuery["indexes.Z"]=1;
    now = new Date();
    now.setHours( now.getHours() - 6 );
    db.collection('HardwarethonInfo').findAndModify({},{indexes:1},{$inc:newQuery} , {upsert: true, new: true}, function(err, doc_ids){
        req.query['_id'] = doc_ids.value.indexes.Z;
        req.query['fecha'] = now;
        db.collection('Z').insert(req.query, function(err, doc){
            if(err) res.send(400, err);
            res.send(200, doc.ops[0]);
        })
    })
}

exports.getData = function(req,res) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString="logs.get."+now+'.Z',
        newQuery = {};
    newQuery[dateString]=1;

    db.collection('HardwarethonInfo').findAndModify({},{}, {$inc: newQuery}, {upsert: true, new: true}, function(err, doc_ids){
        db.collection('Z').find({}, {_id:0}).toArray(function(err, doc){
            if(err) res.send(400, err);
            res.send(200, doc);
        })
    })
}