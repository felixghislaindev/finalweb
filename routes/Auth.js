var express = require("express");
var router = express.Router();

var  passport = require("passport"),
     User     = require("../models/User"),
     Order = require("../models/orders"),
     Cart = require("../models/ShoppingCart"),
     multer = require('multer'),
     cloudinary = require('cloudinary');

     var imgstorage = multer.diskStorage({
      filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
      }
    });
    var imgFilter = function (req, file, cb) {
        // will accept file shown bellow only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error('will only allow certain type of file!'), false);
        }
        cb(null, true);
    };
    var upload = multer({ storage: imgstorage, fileFilter: imgFilter});
    
    
    cloudinary.config({ 
      cloud_name: 'ragefitness', 
      api_key: "781792735121654", 
      api_secret:"dRhp7_rcrh1CWbf5-0gdQ535AWU"
    });

  
  // define route for login page
  router.get("/register", function (req, res,) {
    res.render("register");
 
  req.session.errors = null;
  
  });
  
  router.post("/register",upload.single('avatar'), function(req,res){
    
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
 // add cloudinary img url
 cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
  if(err) {
   
    return res.redirect('back');
  }
  // add cloudinary img url
  req.body.avatar = result.secure_url;
  req.body.imageId = result.public_id;
  console.log(result.public_id);
 

    var newUser = new User ({
      Firstname : req.body.firstname,
      Secondname : req.body.secondname,
      username : req.body.username,
      Telephone : req.body.telephone,
      Email: req.body.email,
      avatar: req.body.avatar

    }); 
  
  User.register(newUser,req.body.password, function(err){
    if(err){
     
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

  router.get("/user",checkIfLoggedIn,function(req,res){
    Order.find({user: req.user}, function(err, orders){
      if(err){
        console.log(err);
      } 
      else{
        var cart;
      orders.forEach(function(order){
        cart = new Cart(order.cart);
        order.items = cart.generateArray();
     
       
      })
      res.render("./Profile/userprofile", {orders:orders});
      
      }
      
    })

      })
   
     
 
  
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