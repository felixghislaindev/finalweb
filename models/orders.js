
//requiring mongoose

var mongoose = require("mongoose");

//blog Schema setup

var OderSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User"
  },
  cart: { type: Object, require:true},
  address: String,
  name: String,
  payementId: String

});

// exporting the schema
module.exports = mongoose.model("Order", OderSchema);
