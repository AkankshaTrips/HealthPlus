var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var reportSchema = mongoose.Schema({
    name       : String
    age        : Number
    height     : String
    weight     : String
    symptoms   : String
    med        : String
    created_at : Date
    tests      : String

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Report', reportSchema);
