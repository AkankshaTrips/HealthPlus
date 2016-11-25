/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

var app = express(); // Create a new express server

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// Serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/'));

// Get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// MongoDB setup
 var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 

// Connection URL 
var url = 'mongodb://d8354849-9635-41a3-b1cc-5f70ba99090e:5452eaa4-d5b3-4c8f-8a08-a4273b51f377@23.246.199.101:10021/db';

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertDocuments(db, function() {
    db.close();
  });
});

// Testing Database
var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('documents');
  // Insert some documents 
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

//app.get('/nihu', function(req, res) {
//		res.sendfile('./public/index.html');
//});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


// Line 77-81 is the database configuraion that has been commented out for now
//var configDB = require('./config/database.js');

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// To avoid warnings for bodyParser()
/* app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); */

app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// To avoid warnings session
//app.use(session({secret: '<mysecret>', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

