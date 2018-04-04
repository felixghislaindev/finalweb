var express = require("express");
var router = express.Router();

var  passport = require("passport"),
     User     = require("../models/User");
  
  // define route for login page
  router.get("/register", function (req, res) {
    res.render("register");
  });
  
  router.post("/register", function(req,res){
    var newUser = new User ({
      Firstname : req.body.firstname,
      Secondname : req.body.secondname,
      username : req.body.username,
      Telephone : req.body.telephone,
      Email: req.body.email
    }); 
  
  User.register(newUser,req.body.password, function(err){
    if(err){
      console.log(err);
      return res.render("register");
    } else {
      //will log and authenticate the user is register is gone through 
      passport.authenticate("local")(req,res, function (){
        res.redirect("/");
      });
    }
  });
  });
  
  // define route for login page
  router.get("/login", function (req, res) {
    res.render("login");
  });
  // resposible for handling login logic 
  router.post("/login",passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/login"}) ,function(req,res){ 
  
  });
  
  // log out route logic 
  router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/")
  });
  router.get("/user",function(req,res){
   
     res.render("./Profile/userprofile");
   });
  
  //  middleware 
  // check if a user is logged in 
  function checkIfLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    } else{
      res.redirect("/login");
    };
  };

  module.exports = router;