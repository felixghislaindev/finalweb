var express = require("express");
var router = express.Router();
var Blog    = require("../models/blog"),
    Comment   = require("../models/comment");
// route for commenting on the blog post 
router.post("/blogs/:id/comment",checkIfLoggedIn, function(req,res){
    // look up blog 
  Blog.findById(req.params.id, function(err, foundblog){
    if(err){
      console.log(err);
      res.redirect("/");
    } else {
      //create and push comment to blog
      Comment.create(req.body.comment, function(err,comment){
        if(err){
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          foundblog.comments.push(comment);
          foundblog.save();
          res.redirect("/blog/" + foundblog._id );
    
        }
      });
    };
    
  });
  // create new comment
 
  });

  function checkIfLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    } else{
      res.redirect("/login");
    };
  };
 

  module.exports = router;