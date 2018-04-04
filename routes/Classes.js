var express = require("express");
var router = express.Router();
var  Class   = require("../models/class");
     
//show all the classes
router.get("/classes", function (req, res) {
    Class.find({}, function (err, foundclasses) {
      if (err) {
        console.log("not found");
      } else {
        res.render("./classes/class", {
          foundclasses: foundclasses
        });
      }
    })
  
  });
  
  // show a class 
  
  router.get("/classes/:id", function (req, res) {
    Class.findById(req.params.id, function (err, foundclass) {
      if (err) {
        console.log(err);
      } else {
     
        res.render("./classes/showclass", {
          foundclass: foundclass
        });
      }
    });
  
  });

  module.exports = router;
  
