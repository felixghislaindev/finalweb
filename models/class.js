
//requiring monggose 
var mongoose = require("mongoose");

// class schema setup
var classSchema = new mongoose.Schema({
    className: String,
    classImage: String,
    classType: String,
    classDescription: String
});

    // exporting the schema
module.exports = mongoose.model("Class", classSchema);
