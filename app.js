var express = require("express"),
  app = express(),
  http = require('http'),
  request = require("request"),
  bodyparser = require("body-parser"),
  mongoose = require("mongoose");
  session = require("express-session");
  passport = require("passport");
  LocalStrategy = require("passport-local");
  passportLocalMongoose = require("passport-local-mongoose");
  Class = require("./models/class"),
  Blog = require("./models/blog"),
  Admin = require("./models/Admin"),
  User = require("./models/User"),
  Cart = require("./models/ShoppingCart"),
  Product = require("./models/Product"),
  validator =  require("express-validator"),
  Mongostore = require("connect-mongo")(session),
  methodOverride = require("method-override");


// require routes



// connecting to the database 
mongoose.connect("mongodb://localhost/rage-fitness");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(validator());
app.use(session({
  secret:"using passport package",
  resave: true,
  saveUninitialized: true,
  store: new Mongostore({mongooseConnection:mongoose.connection }),
  cookie: {maxAge: 180 * 60 * 1000 }
}));


app.use(methodOverride("_method"));
//use passport 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});



//reaching the home page
//define the index page route
app.get("/", function (req, res) {
  res.render("Home");
});

//define the about page route
app.get("/about", function (req, res) {
  res.render("about");
});


//define the contact page route
app.get("/contact", function (req, res) {
  res.render("contact");
});

//show all the classes
app.get("/classes", function (req, res) {
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

app.get("/classes/:id", function (req, res) {
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


// defines the routes for the blog page

app.get("/blog", function (req, res) {
  Blog.find({}, function(err, foundblog){
    if(err){
      console.log(err);
    } else{
      res.render("./blog/blog", {foundblog:foundblog});
    }
  });
});

//show specific blog 
app.get("/blog/:id", function(req, res){
Blog.findById(req.params.id, function(err, foundblog){
  if(err){
    console.log(err);
  } else {
    res.render("./blog/showblog", {foundblog:foundblog});
  }
});
});
// define routes for the store page
app.get("/store", function (req, res) {
  Product.find({}, function(err,foundproduct){
    if(err){
      console.log(err);
    } else{
      res.render("store/store", {foundproduct:foundproduct});
    }
  });
  
});

// show specific product 
app.get("/store/:id", function(req,res){
  Product.findById(req.params.id, function(err,foundproduct){
    if(err){
      console.log(err);
    } else{
    res.render("./store/showprod", {Product:foundproduct});
    }
  })
})

// define rout for content management 
app.get("/cms", function (req, res) {
  res.render("./cms/cms");
});



// define route for login page
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function(req,res){
User.register(new User ({
  Fisrtname : req.body.firstname,
  Secondname : req.bodysecondname,
  username : req.body.username,
  Telephone : req.body.Telephone
}),req.body.password, function(err){
  if(err){
    console.log(err);
    return res.render("/");
  } else {
    passport.authenticate("local")(req,res, function (){
      res.redirect("/login");
    })
  }
});
});

// define route for login page
app.get("/login", function (req, res) {
  res.render("login");
});
 app.post("/login",passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"}) ,function(req,res){ 

});










//Show classes in cms
app.get("/cmsclass", function (req, res) {

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
app.get("/cmsclass/newclass", function (req, res) {
  res.render("./cms/newclass");

})
app.post("/cmsclass/newclass", function (req, res) {
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
app.get("/cmsclass/:id/editclass", function (req, res) {
Class.findById(req.params.id, function(err, foundclass){
  res.render("./cms/editclass",{Class:foundclass});
})
});

//UPDATE CLASSES
app.put("/cmsclass/:id",function(req,res){
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
app.delete("/cmsclass/:id", function(req, res){
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

app.get("/cmsblog", function (req, res) {
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
app.get("/cmsblog/newblog", function (req, res) {
  res.render("./cms/newblog");
});
app.post("/cmsblog/newblog", function(req,res){
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
app.get("/cmsblog/:id/editblog", function (req, res) {
  Blog.findById(req.params.id, function(err, foundblog){
    if(err){
      console.log(err);
    } else{
      res.render("./cms/showblog", {foundblog:foundblog});
    }
  })
  
});

//update changes made to the blog 
app.put("/cmsblog/:id", function(req,res){
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

app.delete("/cmsblog/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect("/cmsblog");
    }
  })
})

// define route for cms store page
app.get("/cmsstore", function (req, res) {
  res.render("./cms/cmsstore");
});
// define route for cms store page
app.get("/cmsprod", function (req, res) {
  res.render("./cms/cmsprod");
}); 

// define route to aad new product
app.post("/cmsprod", function(req,res){
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
      console.log(ProductType);
     
      res.redirect("/cmsstore");
    }
  });
});

// define route to view product in the database
app.get("/cmsviewprod", function (req, res) {

  Product.find({}, function(err, foundproduct){
    if(err){
      console.log(err);
    } else {
      res.render("./cms/cmsviewprod", {foundproduct:foundproduct});
    }
  })
  
});

app.get("/cmsviewprod/:id/editprod", function(req,res){
  Product.findById(req.params.id, function(err,foundproduct){
    if(err){
      console.log(err);
    } else {
      res.render("./cms/editprod", {Product:foundproduct})
    }
   
  });
});

// updte the product 
app.put("/cmsviewprod/:id", function(req,res){
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
app.delete("/cmsviewProd/:id", function(req,res){
  Product.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect("/cmsviewprod");
    }
  })
})


// define route for cms user page
app.get("/cmsuser", function (req, res) {
  res.render("./cms/cmsuser");
});




// define route for Admin login and sign up 
app.get("/cms/signup", function (req, res) {
  //will show admin creation form
  res.render("./cms/AdminSignUp");
});

//handles Adming creation
app.post("/cms/signup", function(req,res){
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
app.get("/cms/login", function (req, res) {
  //show admin login form
  res.render("./cms/login");
});

app.post("/cms/login",passport.authenticate("local", {
          successRedirect: "/cms",
          failureRedirect: "/cms/login"}) ,function(req,res){ 

});




app.get("/getcart/:id", function(req,res){
  var producID = req.params.id;
  var cart = new Cart(req.session.cart? req.session.cart : {});

Product.findById(producID, function(err, product){
 if(err){
   console.log(err);
   return res.redirect("/");
 } else{
   cart.add(product, producID);
   req.session.cart =  cart;
   console.log(req.session.cart);
   res.redirect("/store");
 }

}) 
});

app.get("/card", function(req,res,next){
if(!req.session.cart){
  return res.render("./store/Cart", {products:null});
}  else{
  var cart = new Cart(req.session.cart);
  res.render("./store/cart", { products: cart.generateArray(), totalPrice: cart.totalPrice});
  console.log(this.ProductPrice);
}
})



app.listen(3000, function () {
  console.log("server is on!!");

});