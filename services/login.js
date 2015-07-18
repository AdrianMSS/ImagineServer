/**
* @description Functions used by login/logout services
* @author Adrián Sánchez <adriansanchez.logn@gmail.com>
*/

var mongo = require('mongodb');
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/Hardwarethon';

// The http server will listen to an appropriate port, or default to

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
/*mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});
*/

var uri = 'mongodb://user:pass@host:port/db';
var db;

mongo.MongoClient.connect(uristring, function(err, database) {
    if(!err) {
        db = database;
        console.log('Connected to "Hardwarethon_Database" database');
    }
    else{
        console.log(404, 'Error Connecting to "Hardwarethon_Database" database');
    }
});
 
/*var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('Hardwarethon_Database', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log('Connected to "Hardwarethon_Database" database');
    }
    else{
        console.log(404, 'Error Connecting to "Hardwarethon_Database" database');
    }
});*/

exports.newData = function(req,res) {
    db.collection('Datos').insert(req.body, function(err, doc){
        if(err) throw err;
        res.send(200, doc);
    })
}


exports.getData = function(req,res) {
    db.collection('Datos').find().toArray(function(err, doc){
        if(err) throw err;
        res.send(200, doc);
    })
}
/**
* @description Login a user in the database (setting the sessionValue)
* @author Adrián Sánchez <adriansanchez.logn@gmail.com>
* @param {req, res} request (with the email and password) send to the server and the response return by the server
* @returns {Int} session_token
*/ 
exports.logIn = function(req, res) {
    var email = req.body['email'];
        password = req.body['pass'];
    if ((typeof(email) == 'undefined') || (typeof(password) == 'undefined')) {
        res.send(401, {'error': 'Email or Password invalid'}); 
    }
    else {
        console.log('Logging in user...');
        db.collection('email', function(err, collection_email) {
            try {
                collection_email.findOne({email: email}, function(err, item) {
                    if(item != null){
                        db.collection('user', function(err, collection_user) {
                            collection_user.findOne({email: item._id, password: password}, function(err, items){
                                if(items != null){
                                    console.log('User accepted');
                                    collection_user.update({_id: items._id}, {$set: {sessionValue: 1, sessionDate: (new Date()), sessionLogIn: (new Date())}}, {safe: true}, function(err, result) {
                                        if (err) {
                                            console.log('Error updating sessionValue: ' + err);
                                            res.send(409, {'error': 'An error has occurred updating the sessionValue'});
                                        } 
                                        else {
                                            console.log('' + result + ' document(s) updated');
                                            res.send(200, {'User' : items.name, 'id' : items._id, "session_token" : items.sessionValue});
                                        }
                                    });
                                }
                                else {
                                    res.send(401, {'error': 'Email or password incorrect'});
                                }
                            })
                        });
                    }
                    else {
                        res.send(401, {'error': 'Email or password incorrect'});
                    }
                });
            }
            catch (err){
                res.send(409, err);
            }
        });                    
    }            
};
