var express = require("express"),
  app = express(),
  http = require('http'),
  request = require("request"),
  bodyparser = require("body-parser"),
  mongoose = require("mongoose");
Class = require("./models/class"),
Blog = require("./models/blog"),
methodOverride = require("method-override");


// require routes



// connecting to the database 
mongoose.connect("mongodb://localhost/rage-fitness");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));



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

// define rout for content management 
app.get("/cms", function (req, res) {
  res.render("./cms/cms");
});

// define route for cms login page
app.get("/login", function (req, res) {
  res.render("login");
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

// CREAT NEW CLASS


// define route for cms blog page
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

})
// define route for cms blog page
app.get("/showblog", function (req, res) {
  res.render("./cms/showblog");
});


// define route for cms store page
app.get("/cmsstore", function (req, res) {
  res.render("./cms/cmsstore");
});
// define route for cms store page
app.get("/cmsnewprod", function (req, res) {
  res.render("./cms/cmsnewprod");
});

// define route for cms store page
app.get("/cmsviewprod", function (req, res) {
  res.render("./cms/cmsviewprod");
});

// define route for cms user page
app.get("/cmsuser", function (req, res) {
  res.render("./cms/cmsuser");
});

// defines the routes for the blog page

app.get("/blog", function (req, res) {
  res.render("/blog/blog");
})

// define routes for the store page
app.get("/store", function (req, res) {
  res.render("store/store");
})



app.listen(3000, function () {
  console.log("server is on!!");

});