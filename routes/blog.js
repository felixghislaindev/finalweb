var express = require("express");
var router = express.Router();
var  Blog = require("../models/blog");
// defines the routes for the blog page

router.get("/blog", function (req, res) {
  Blog.find({}, function(err, foundblog){
      if(err){
        console.log(err);
      } else{
        res.render("./blog/blog", {foundblog:foundblog});
      }
    });
  });
  
  //show specific blog 
  router.get("/blog/:id", function(req, res){
    Blog.find({}, function(err, foundblogs){
      if(err){
        console.log(err);
     
      }
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundblog){
    if(err){
      console.log(err);
    } else {
      console.log(foundblog);
      res.render("./blog/showblog", {foundblog:foundblog,foundblogs:foundblogs});
    }
  });
  });
});

  module.exports = router;