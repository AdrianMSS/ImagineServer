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
        console.log('Connected to the "Hardwarethon_Database" database');
    }
    else{
        console.log(404, 'Error Connecting to the "Hardwarethon_Database" database');
    }
});


exports.newData = function(req,res, team) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString='logs.post.'+now+'.'+team,
        newQuery = {},
        queryField = 'indexes.'+team;
    newQuery[dateString]=1;
    newQuery[queryField]=1;
    now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setSeconds(0);
    now.setMilliseconds(0);
    db.collection('HardwarethonInfo').findAndModify({},{indexes:1},{$inc:newQuery} , {upsert: true, new: true}, function(err, doc_ids){
        req.query['_id'] = doc_ids.value.indexes[team];
        req.query['fecha'] = now;
        db.collection(team).insert(req.query, function(err, doc){
            if(err) res.send(400, err);
            res.send(200, doc.ops[0]);
        })
    })
}

exports.getData = function(req,res, team) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString='logs.get.'+now+'.'+team,
        newQuery = {},
        queryField = 'indexes.'+team;
    newQuery[dateString]=1;

    db.collection('HardwarethonInfo').findAndModify({},{}, {$inc: newQuery}, {upsert: true, new: true}, function(err, doc_ids){
        if(req.query.id){
            var idNumber = parseInt(req.query.id);
            db.collection(team).findOne({_id:idNumber}, function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })
        }
        else if(req.query.cantidad){
            var quantityNumber = parseInt(req.query.cantidad);
            db.collection(team).aggregate([{$match:{}}, {$sort:{_id:-1}}, {$limit:quantityNumber}]).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })   
        }
        else{
            db.collection(team).find(req.query).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })
        }
    })
}

exports.getData2 = function(req,res, team) {
    var now = new Date();
    now.setHours( now.getHours() - 6 );
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var dateString='logs.get.'+now+'.'+team,
        newQuery = {},
        queryField = 'indexes.'+team;
    newQuery[dateString]=1;

    db.collection('HardwarethonInfo').findAndModify({},{}, {$inc: newQuery}, {upsert: true, new: true}, function(err, doc_ids){
        if(req.query.id){
            var idNumber = parseInt(req.query.id);
            db.collection(team).findOne({_id:idNumber}, function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })
        }
        else if(req.query.Modulo && req.query.ID && req.query.cantidad){
            var quantityNumber = parseInt(req.query.cantidad);
            var bullQuery = {};
            bullQuery['Modulo']=req.query.Modulo;
            bullQuery['ID']=req.query.ID;
            db.collection(team).aggregate([{$match:bullQuery}, {$sort:{_id:-1}}, {$limit:quantityNumber}]).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })   
        }
        else if(req.query.Arduino && req.query.cantidad){
            var quantityNumber = parseInt(req.query.cantidad);
            var maesQuery = {};
                maesQuery['Arduino']=req.query.Arduino;
            db.collection(team).aggregate([{$match:maesQuery}, {$sort:{_id:-1}}, {$limit:quantityNumber}]).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })   
        }
        else if(req.query.r && req.query.cantidad){
            var quantityNumber = parseInt(req.query.cantidad);
            var maesQuery = {};
                maesQuery['r']=req.query.r;
            db.collection(team).aggregate([{$match:maesQuery}, {$sort:{_id:-1}}, {$limit:quantityNumber}]).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })   
        }
        else if(req.query.cantidad){
            var quantityNumber = parseInt(req.query.cantidad);
            db.collection(team).aggregate([{$match:{}}, {$sort:{_id:-1}}, {$limit:quantityNumber}]).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })   
        }
        else{
            db.collection(team).find(req.query).toArray(function(err, doc){
                if(err) res.send(400, err);
                res.send(200, doc);
            })
        }
    })
}