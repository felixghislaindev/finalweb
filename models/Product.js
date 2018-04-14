var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    ProductTitle :String,
    ImageId : String,
    ProductImage :String,
    Keywords: String,
    ProductDescription: String,
    ProductPrice: Number,
    ProductType: String,
    ProductSize: String
});

module.exports = mongoose.model("Product", ProductSchema);