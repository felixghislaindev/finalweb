var express = require("express");
var router = express.Router();
var  Class   = require("../models/class"),
     Blog    = require("../models/blog"),
     Product = require("../models/Product");

// define rout for content management 
router.get("/cms", function (req, res) {
    res.render("./cms/cms");
  });

  //Show classes in cms
  router.get("/cmsclass", function (req, res) {
  
    Class.find({}, function (err, foundclasses) {
      if (err) {
        console.log("not found");
      } else {
        res.render("./cms/cmsclass", {
          foundclasses: foundclasses
        });
      }
    })
  });
  
  // CREATE NEWS CLASS 
  router.get("/cmsclass/newclass", function (req, res) {
    res.render("./cms/newclass");
  
  });
  router.post("/cmsclass/newclass", function (req, res) {
    var className = req.body.classname;
    var classType = req.body.classtype;
    var classImage = req.body.classimage;
    var classDescription = req.body.classdescription;
    var classDay = req.body.classday;
    var classStartTime = req.body.classStartTime;
    var classEndTime = req.body.classEndTime;
    var classInfo = req.body.classInfo;
    var newclass = {
      className: className,
      classType: classType,
      classImage: classImage,
      classDescription: classDescription,
      classDay: classDay,
      classStartTime: classStartTime,
      classEndTime: classEndTime,
      classInfo: classInfo 
    }
    Class.create(newclass, function (err, newclass) {
      if (err) {
        console.log(err);
      } else {
       
       res.redirect("/cmsclass");
      }
    });
  
  
  });
  
  // EDIT CLASSES   
  router.get("/cmsclass/:id/editclass", function (req, res) {
  Class.findById(req.params.id, function(err, foundclass){
    res.render("./cms/editclass",{Class:foundclass});
  })
  });
  
  //UPDATE CLASSES
  router.put("/cmsclass/:id",function(req,res){
    Class.findByIdAndUpdate(req.params.id,{
      className:        req.body.classname,
      classType:        req.body.classtype,
      classImage:       req.body.classimage,
      classDescription: req.body.classdescription,
      classInfo:        req.body.classInfo,
      classDay:         req.body.classday,
      classStartTime:   req.body.classStartTime,
      classEndTime:     req.body.classEndTime
   
    }, function(err, udpatedclass){
  
    if(err){
        console.log(err);
       } else{
        res.redirect("/cmsclass");
       }
  
    });
  });
  
  //DELETE/ DESTROY CLASSES
  router.delete("/cmsclass/:id", function(req, res){
    Class.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
      } else{
        console.log(req.param.id);
        res.redirect("/cmsclass");
      }
    })
  });
  
  // define route for cms blog page
  //show blogs 
  
  router.get("/cmsblog", function (req, res) {
    Blog.find({}, function(err,foundblog){
      if(err){
        console.log(err);
      } else {
        res.render("./cms/cmsblog", {foundblog:foundblog});
      }
    })
  
  });
  
  
  
  
  // define route for cms blog page
  // CREATE NEW BLOG
  router.get("/cmsblog/newblog", function (req, res) {
    res.render("./cms/newblog");
  });
  router.post("/cmsblog/newblog", function(req,res){
    var blogTitle = req.body.Blogtitle;
    var blogImage = req.body.Blogimage;
    var blogDescription = req.body.Blogdescription;
    var blogAuthor = req.body.Blogauthor;
    
    var newblog = {
      blogTitle:blogTitle,
      blogImage:blogImage,
      blogDescription: blogDescription,
      blogAuthor:blogAuthor
    }
    Blog.create(newblog, function(err,newblog){
      if(err){
        console.log(err)
      } else {
        console.log(newblog);
        res.redirect("/cmsblog");
      }
    })
  
  });
  
  // UPDATE BLOG 
  // find the specific blog and display on the edit blog page
  router.get("/cmsblog/:id/editblog", function (req, res) {
    Blog.findById(req.params.id, function(err, foundblog){
      if(err){
        console.log(err);
      } else{
        res.render("./cms/showblog", {foundblog:foundblog});
      }
    })
    
  });
  
  //update changes made to the blog 
  router.put("/cmsblog/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, {
      blogTitle : req.body.Blogtitle,
      blogImage : req.body.Blogimage,
      blogDescription: req.body.Blogdescription 
    }, function(err, updatedblog){
      if(err){
        console.log(err);
      } else{
        res.redirect("/cmsblog");
      }
    });
  });
  
  //DELETE/ DESTROY BLOG
  
  router.delete("/cmsblog/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
      } else{
        res.redirect("/cmsblog");
      }
    })
  })
  
  // define route for cms store page
  router.get("/cmsstore", function (req, res) {
    res.render("./cms/cmsstore");
  });
  // define route for cms store page
  router.get("/cmsprod", function (req, res) {
    res.render("./cms/cmsprod");
  }); 
  
  // define route to aad new product
  router.post("/cmsprod", function(req,res){
    var ProductImage = req.body.Productimage;
    var ProductTitle =  req.body.Productname;
    var ProductDescription = req.body.Productdescription;
    var ProductPrice = req.body.Productprice;
    var ProductType = req.body.Producttype;
    var ProductSize = req.body.Productsize;
  
    var newProduct = {
      ProductImage:ProductImage,
      ProductTitle:ProductTitle,
      ProductDescription: ProductDescription,
      ProductPrice: ProductPrice,
      ProductType: ProductType,
      ProductSize : ProductSize
  
    } 
  
    Product.create(newProduct, function(err, newProduct){
      if(err){
        console.log(err);
      } else {
        console.log( "new product is"+ newProduct);
       
        res.redirect("/cmsstore");
      }
    });
  });
  
  // define route to view product in the database
  router.get("/cmsviewprod", function (req, res) {
  
    Product.find({}, function(err, foundproduct){
      if(err){
        console.log(err);
      } else {
        res.render("./cms/cmsviewprod", {foundproduct:foundproduct});
      }
    })
    
  });
  
  router.get("/cmsviewprod/:id/editprod", function(req,res){
    Product.findById(req.params.id, function(err,foundproduct){
      if(err){
        console.log(err);
      } else {
        res.render("./cms/editprod", {Product:foundproduct})
      }
     
    });
  });
  
  // updte the product 
  router.put("/cmsviewprod/:id", function(req,res){
  Product.findByIdAndUpdate(req.params.id, {
    ProductImage:req.body.ProductImage,
    ProductTitle:req.body.ProductTitle,
    ProductDescription: req.body.ProductDescription,
    ProductPrice: req.body.ProductPrice,
    ProductType: req.body.ProductType,
    ProductSize : req.body.ProductSize
  }, function(err,Updatedprod){
    if(err){
      console.log(err)
    } else{
      console.log(  req.body.ProductType);
      res.redirect("/cmsviewprod");
    }
  });
  });
  
  //Delete/Destroy the product
  router.delete("/cmsviewProd/:id", function(req,res){
    Product.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
      } else{
        res.redirect("/cmsviewprod");
      }
    })
  })
  
  
  // define route for cms user page
  router.get("/cmsuser", function (req, res) {
    res.render("./cms/cmsuser");
  });
  
  
  
  
  // define route for Admin login and sign up 
  router.get("/cms/signup", function (req, res) {
    //will show admin creation form
    res.render("./cms/AdminSignUp");
  });
  
  //handles Adming creation
  router.post("/cms/signup", function(req,res){
    req.body.username
    req.body.password
    Admin.register(new Admin ({ username : req.body.username}), req.body.password, function(err,user){
      if(err){
        console.log(err);
        return res.render("./cms/AdminSignUp");
      } else {
        passport.authenticate("local")(req,res,function(){
          res.redirect("/cms");
        })
      }
    })
  
  
  });
  
  //login routes 
  router.get("/cms/login", checkIfAdmin,function (req, res) {
    //show admin login form
    console.log(req.user);
    res.render("./cms/login");
  });
  
  router.post("/cms/login",passport.authenticate("local", {
            successRedirect: "/cms",
            failureRedirect: "/cms/login"}) ,function(req,res){ 
  
  });

  function checkIfAdmin(req,res,next){
    if (req.isAuthenticated() && req.user.isAdmin == true){
      return next();
    }else{
      res.redirect("/");
    } 
    
  } 
  
  module.exports = router;