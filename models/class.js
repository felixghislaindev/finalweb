
//requiring mongoose 
var mongoose = require("mongoose");

// class schema setup
var classSchema = new mongoose.Schema({
    className: String,
    classImageId: String,
    classImage: String,
    classType: String,
    classDescription: String,
    classDay: String,
    classStartTime : String,
    classEndTime: String, 
    classInfo: String
});

    // exporting the schema
module.exports = mongoose.model("Class", classSchema);
