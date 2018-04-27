
//requiring mongoose

var mongoose = require("mongoose");

//blog Schema setup

var blogSchema = new mongoose.Schema({
    blogTitle: String,
    imageId:String,
    blogImage: String,
    blogIntro: String,
    blogmainsection: String,
    blogDescription: String,
    blogconclusion: String,
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


