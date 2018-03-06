var express = require("express"),
app = express(),
http = require('http'),
request = require("request"),
bodyparser = require("body-parser");


// connecting to mongodb

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));



//reaching the home page
//define the index page route
app.get("/",  function(req, res){
    res.render("Home");
  });

  //define the about page route
app.get("/about",  function(req, res){
  res.render("about");
});


  //define the contact page route
  app.get("/contact",  function(req, res){
    res.render("contact");
  });

   //show all the classes
   app.get("/classes",  function(req, res){
    res.render("classes");
  });

  // show a class 
  app.get("/showclass", function(req,res){
    res.render("showclass");
  })


  // define rout for content management 
  app.get("/cms", function(req,res){
    res.render("cms");
  });

  // define route for cms login page
  app.get("/login", function(req,res){
    res.render("login");
  });

    // define route for cms blog page
    app.get("/cmsblog", function(req,res){
      res.render("cmsblog");
    });

    // define route for cms blog page
    app.get("/newblog", function(req,res){
      res.render("newblog");
    });
    // define route for cms blog page
    app.get("/showblog", function(req,res){
      res.render("showblog");
    });


     // define route for cms store page
     app.get("/cmsstore", function(req,res){
      res.render("cmsstore");
    });
     // define route for cms store page
     app.get("/cmsnewprod", function(req,res){
      res.render("cmsnewprod");
    });

     // define route for cms store page
     app.get("/cmsviewprod", function(req,res){
      res.render("cmsviewprod");
    });

     // define route for cms user page
     app.get("/cmsuser", function(req,res){
      res.render("cmsuser");
    });

    // defines the routes for the blog page
    
    app.get("/blog", function(req,res){
      res.render("blog");
    })

    // define routes for the store page
    app.get("/store", function(req,res){
      res.render("store");
    })


app.listen( 3000, function () {
  console.log("server is on!!");

});
