
//requiring mongoose

var mongoose = require("mongoose");

//blog Schema setup

var blogSchema = new mongoose.Schema({
    blogTitle: String,
    blogImage: String,
    blogDescription: String,
    blogAuthor:String
});

// exporting the schema
module.exports = mongoose.model("Blog", blogSchema);


