var express = require("express");
var router = express.Router();
var  Class   = require("../models/class"),
     Blog    = require("../models/blog"),
     Product = require("../models/Product"),
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
  router.post("/cmsclass/newclass",upload.single('Classimage') ,function (req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if(err) {
       
        return res.redirect('back');
      }
      // add cloudinary img url
      req.body.Classimage = result.secure_url;
      req.body.imageId = result.public_id;
      console.log(result.public_id);

      
     
     
    
    var className = req.body.classname;
        classType = req.body.classtype,
        classImage = req.body.Classimage,
        classImageId = req.body.imageId,
        classDescription = req.body.classdescription,
        classDay = req.body.classday,
        classStartTime = req.body.classStartTime,
        classEndTime = req.body.classEndTime,
        classInfo = req.body.classInfo;

     newclass = {
      className: className,
      classType: classType,
      classImageId: classImageId,
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
        return res.redirect("back");
      } else {
       
       res.redirect("/cmsclass");
      }
    });
  
  
  });
});
  // EDIT CLASSES   
  router.get("/cmsclass/:id/editclass", function (req, res) {
  Class.findById(req.params.id, function(err, foundclass){
    res.render("./cms/editclass",{Class:foundclass});
  })
  });
  
  //UPDATE CLASSES
  router.put("/cmsclass/:id", upload.single("Classimage"),  function(req,res){
   
    Class.findById(req.params.id,async function(err, udpatedclass){
  
    if(err){
        console.log(err);
       } else{
        if(req.file){
          try {
            await cloudinary.v2.uploader.destroy(udpatedclass.classImageId);
            var result = await cloudinary.v2.uploader.upload(req.file.path);
            udpatedclass.classImageId = result.public_id;
            udpatedclass.classImage = result.secure_url;
          } catch (err){
            console.log(err);
            return res.redirect("back");
          }
         
         }
        
        
         
         udpatedclass.className =       req.body.classname;
         udpatedclass.classType =       req.body.classtype;
         udpatedclass.classDescription = req.body.classdescription,
         udpatedclass.classInfo =        req.body.classInfo,
         udpatedclass.classDay =        req.body.classday,
         udpatedclass.classStartTime =   req.body.classStartTime,
         udpatedclass.classEndTime =    req.body.classEndTime
          udpatedclass.save();
          console.log("sucessfully updated");
        
        res.redirect("/cmsclass");
       }
  
    });
  });
  

  {
  
  }
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
  router.post("/cmsblog/newblog",upload.single('Blogimage') ,function(req,res){
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if(err) {
       
        return res.redirect('back');
      }
      // add cloudinary img url
      req.body.Blogimage = result.secure_url;
      req.body.imageId = result.public_id;
      console.log(result.public_id);

    var blogTitle = req.body.Blogtitle;
    var imageId = req.body.imageId;
    var blogImage = req.body.Blogimage;
    var blogIntro = req.body.blogIntro;
    var blogmainsection = req.body.blogmainsection;
    var blogDescription = req.body.Blogdescription;
    var blogconclusion = req.body.blogconclusion;
    var blogAuthor = req.body.Blogauthor;
    
    var newblog = {
      blogTitle:blogTitle,
      imageId:imageId,
      blogImage:blogImage,
      blogIntro: blogIntro,
      blogmainsection: blogmainsection,
      blogDescription: blogDescription,
      blogconclusion: blogconclusion,
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
  router.put("/cmsblog/:id",upload.single('Blogimage') ,function(req,res){
    Blog.findById(req.params.id,async function(err, updatedblog){

      if(err){
        console.log(err);
       } else{
        if(req.file){
          try {
            await cloudinary.v2.uploader.destroy(updatedblog.imageId);
            var result = await cloudinary.v2.uploader.upload(req.file.path);
            updatedblog.imageId = result.public_id;
            updatedblog.blogImage = result.secure_url;
          } catch (err){
            console.log(err);
            return res.redirect("back");
          }
         
         }

    
         updatedblog.blogTitle = req.body.Blogtitle;
         updatedblog.blogDescription= req.body.Blogdescription;
         updatedblog.save();
         res.redirect("/cmsblog");
         console.log("sucessfully updated");
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
  router.post("/cmsprod",upload.single('Productimage') ,function(req,res){
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if(err) {
       
        return res.redirect('back');
      }
         // add cloudinary img url
         req.body.Productimage = result.secure_url;
         req.body.imageId = result.public_id;
         console.log(result.public_id);

    var ProductImage = req.body.Productimage;
        ProductTitle =  req.body.Productname;
        ImageId = req.body.imageId;
        ProductDescription = req.body.Productdescription;
        ProductPrice = req.body.Productprice;
        ProductType = req.body.Producttype;
        ProductSize = req.body.Productsize;
        Keywords = req.body.Tags;

   
        
  
    var newProduct = {
      ProductImage:ProductImage,
      ImageId:ImageId,
      ProductTitle:ProductTitle,
      Keywords:Keywords,
      ProductDescription: ProductDescription,
      ProductPrice: ProductPrice,
      ProductType: ProductType,
      ProductSize : ProductSize,
      
  
    } 
    console.log( "new product is"+ newProduct);
  
    Product.create(newProduct, function(err, newProduct){
      if(err){
        console.log(err);
      } else {
       
        
       
        res.redirect("/cmsstore");
      }
    });
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
  router.put("/cmsviewprod/:id",upload.single('Productimage') ,function(req,res){
         Product.findById(req.params.id,async function(err, Updatedprod){

          if(err){
            console.log(err);
           } else{
            if(req.file){
              try {
                await cloudinary.v2.uploader.destroy(Updatedprod.ProductImage);
                var result = await cloudinary.v2.uploader.upload(req.file.path);
                Updatedprod.ImageId = result.public_id;
                Updatedprod.ProductImage = result.secure_url;
              } catch (err){
                console.log(err);
                return res.redirect("back");
              }
             
             }
    
             Updatedprod.ProductTitle = req.body.ProductTitle,
             console.log(req.body.ProductTitle);
             Updatedprod.ProductDescription = req.body.ProductDescription,
             console.log( Updatedprod.ProductDescription);
             Updatedprod.ProductPrice = req.body.ProductPrice,
             console.log(Updatedprod.ProductPrice);
             Updatedprod.ProductType =  req.body.ProductType,
             console.log( Updatedprod.ProductType);
             Updatedprod.ProductSize  = req.body.ProductSize
             console.log(Updatedprod.ProductSize);
             Updatedprod.save();

             
             res.redirect("/cmsviewprod");
             console.log("sucessfully updated");
            }
         })
        })
             
          
    
        
          
          
          
         
      
        
       

  
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
  router.get("/cms/signup",function (req, res) {
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
  router.get("/cms/login",checkIfAdmin,function (req, res) {
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