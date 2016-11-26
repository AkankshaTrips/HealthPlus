var mongoose = require('mongoose');

// define the schema for our user model
var reportSchema = mongoose.Schema({
    name       : String,
    age        : Number,
    height     : String,
    weight     : String,
    symptoms   : String,
    medicines  : String,
    diagnosis  : String,
    created_at : Date

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Report', reportSchema);
