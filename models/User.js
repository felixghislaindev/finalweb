var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema =  new mongoose.Schema({
    Firstname :String,
    Secondname :String, 
    username :String,
    password: String,
    Email :String,
    Telephone:String,
    isAdmin: {type: Boolean, default: true}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);