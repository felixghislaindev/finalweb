var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema =  new mongoose.Schema({
    Firstname :String,
    Secondname :String, 
    username :String,
    imageId :String,
    avatar: String,
    password: String,
    Email :String,
    Telephone:String,
    isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);