/**
* @description REST Api for the A team
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
        console.log('A Team Connected to the "Hardwarethon_Database" database');
    }
    else{
        console.log(404, 'A Team Error Connecting to the "Hardwarethon_Database" database');
    }
});


exports.newData = function(req,res) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString="logs.post."+now+".A",
        newQuery = {};
    newQuery[dateString]=1;
    newQuery["indexes.A"]=1;
    now = new Date();
    now.setHours( now.getHours() - 6 );
    db.collection('HardwarethonInfo').findAndModify({},{indexes:1},{$inc:newQuery} , {upsert: true, new: true}, function(err, doc_ids){
        req.query['_id'] = doc_ids.value.indexes.A;
        req.query['fecha'] = now;
        db.collection('A').insert(req.query, function(err, doc){
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
    var dateString="logs.get."+now+".A",
        newQuery = {};
    newQuery[dateString]=1;

    db.collection('HardwarethonInfo').findAndModify({},{}, {$inc: newQuery}, {upsert: true, new: true}, function(err, doc_ids){
        if(req.id){
            db.collection('A').findOne({_id:req.id}, function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })
        }
        else if(req.cantidad){
            db.collection('A').aggregate([{$sort:{_id:1}}, {$limit:req.cantidad}], function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })   
        }
        else{
            db.collection('A').find(req.query, {_id:1}).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })
        }
    })
}