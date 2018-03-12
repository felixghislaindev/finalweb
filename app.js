var express = require("express"),
  app = express(),
  http = require('http'),
  request = require("request"),
  bodyparser = require("body-parser"),
  mongoose = require("mongoose");
Class = require("./models/class");


// require routes



// connecting to the database 
mongoose.connect("mongodb://localhost/rage-fitness");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));



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
      console.log(foundclass);
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

// define route for cms blog page
app.get("/cmsblog", function (req, res) {
  res.render("./cms/cmsblog");
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
app.get("/newclass", function (req, res) {
  res.render("./cms/newclass");

})
app.post("/newclass", function (req, res) {
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
     console.log(req.body.classInfo);
      console.log("sucess");
    }
  });


});


app.get("/editclass", function (req, res) {
  res.render("./cms/editclass");
});

// define route for cms blog page
app.get("/newblog", function (req, res) {
  res.render("./cms/newblog");
});
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