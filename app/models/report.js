var mongoose = require('mongoose');

// define the schema for our user model
var reportSchema = mongoose.Schema({
    firstName     : String,
    lastName      : String,
    patientID  		: Number,
    age        		: Number,
    height     		: String,
    weight     		: String,
    symptoms   		: String,
    medicines  		: String,
    diagnosis  		: String,
    specialization	: String,
    created_at 		: Date

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Report', reportSchema);

