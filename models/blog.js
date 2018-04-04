
//requiring mongoose

var mongoose = require("mongoose");

//blog Schema setup

var blogSchema = new mongoose.Schema({
    blogTitle: String,
    blogImage: String,
    blogDescription: String,
    blogAuthor:String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// exporting the schema
module.exports = mongoose.model("Blog", blogSchema);


