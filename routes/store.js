var express = require("express");
var router = express.Router();
var Product    = require("../models/Product");
// define routes for the store page
router.get("/store", function (req, res) {
    Product.find({}, function(err,foundproduct){
      if(err){
        console.log(err);
      } else{
        res.render("store/store", {foundproduct:foundproduct});
      }
    });
    
  });
  
  
  
  
  // show specific product 
  router.get("/store/:id", function(req,res){
    Product.findById(req.params.id, function(err,foundproduct){
      if(err){
        console.log(err);
      } else{
      res.render("./store/showprod", {Product:foundproduct});
      }
    })
  })


  router.get("/HOODIES", function(req,res){
    Product.find({ProductType:"HOODIES"}, function(err,foundproduct){
      if(err){
        console.log(err);
      } else{
        res.render("store/store", {foundproduct:foundproduct});
      }
    })
  })
  router.get("/tshirt", function(req,res){
    Product.find({ProductType:"T-shirt"}, function(err,foundproduct){
      if(err){
        console.log(err);
      } else{
        res.render("store/store", {foundproduct:foundproduct});
      }
    })
  })
  router.get("/Accessories", function(req,res){
    Product.find({ProductType:"Accessories"}, function(err,foundproduct){
      if(err){
        console.log(err);
      } else{
        res.render("store/store", {foundproduct:foundproduct});
      }
    })
  })

  module.exports = router;  