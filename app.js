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

   //define the contact page route
   app.get("/classes",  function(req, res){
    res.render("classes");
  });


app.listen( 3000, function () {
  console.log("server is on!!");

});
