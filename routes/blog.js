var express = require("express");
var router = express.Router();
var  Blog = require("../models/blog");
// defines the routes for the blog page

router.get("/blog", function (req, res) {
  Blog.find({}, function(err, foundblog){
      if(err){
        console.log(err);
      } else{
        res.render("./blog/blog", {foundblog:foundblog});
      }
    });
  });
  
  //show specific blog 
  router.get("/blog/:id", function(req, res){
    Blog.find({}, function(err, foundblogs){
      if(err){
        console.log(err);
     
      }
      
          
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundblog){
    if(err){
      console.log(err);
    } else {
      console.log(foundblog);
      res.render("./blog/showblog", {foundblog:foundblog,foundblogs:foundblogs});
    }
  });
  });
});
 //show specific blog 
 router.get("/blogs/:id", function(req, res){
 
    
        
  Blog.findById(req.params.id).populate("comments").exec(function(err, foundblogs){
  if(err){
    console.log(err);
  } else {
    console.log(foundblog);
    res.render("./blog/showblog", {foundblogs:foundblogs});
  }
});
});




// tag search 
router.get("/Gym", function(req,res){
  Blog.find({Keywords:"Gym"}, function(err,foundblog){
    if(err){
      console.log(err);
    } else{
      res.render("./blog/blog", {foundblog:foundblog});
    }
  })
})


router.get("/Activities", function(req,res){
  Blog.find({Keywords:"Activities"}, function(err,foundblog){
    if(err){
      console.log(err);
    } else{
      res.render("./blog/blog", {foundblog:foundblog});
    }
  })
})

router.get("/General", function(req,res){
  Blog.find({Keywords:"General"}, function(err,foundblog){
    if(err){
      console.log(err);
    } else{
      res.render("./blog/blog", {foundblog:foundblog});
    }
  })
})

router.get("/Newbies", function(req,res){
  Blog.find({Keywords:"Newbies"}, function(err,foundblog){
    if(err){
      console.log(err);
    } else{
      res.render("./blog/blog", {foundblog:foundblog});
    }
  })
})

router.get("/Tips", function(req,res){
  Blog.find({Keywords:"Tips"}, function(err,foundblog){
    if(err){
      console.log(err);
    } else{
      res.render("./blog/blog", {foundblog:foundblog});
    }
  })
})


  module.exports = router;