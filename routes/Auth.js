var express = require("express");
var router = express.Router();

var  passport = require("passport"),
     User     = require("../models/User");
  
  // define route for login page
  router.get("/register", function (req, res,) {
    res.render("register");
 
  req.session.errors = null;
  
  });
  
  router.post("/register", function(req,res){
    // validate data entered in the form 
    req.check("firstname", "Please enter your first").isEmpty();
    req.check("secondname", "Please enter your first").isEmpty();
    req.check("username", "Please enter your username").isLength({min:4});
    req.check("email", "Invalid email address").isEmail();
    req.check("password", "Invalid password").isLength({min:4});
    req.check("telephone", "Enter a correct phone number").isNumeric().isLength({min:11});
 var errors = req.validationErrors();
 console.log(errors);
//  if(errors){
//    req.session.errors = errors;
//    req.session.success = false;
//    console.log( req.session.errors);
//  } else{
//   req.session.success = true;
//  }
 

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
        req.flash("success", "Welcome, your are now loggedin");
        res.redirect("/user");
      });
    }
  });
  });
  
  // define route for login page
  router.get("/login", function (req, res) {
    res.render("login", {message:req.flash("error")});
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
   
     res.render("./Profile/userprofile", {message : "heloo"});
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