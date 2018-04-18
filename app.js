var express = require("express"),
  app = express(),
  http = require('http'),
  request = require("request"),
  bodyparser = require("body-parser"),
  mongoose = require("mongoose");
  session = require("express-session");
  passport = require("passport");
  flash = require("connect-flash");
  LocalStrategy = require("passport-local");
  passportLocalMongoose = require("passport-local-mongoose");
  Class = require("./models/class"),
  Blog = require("./models/blog"),
  Admin = require("./models/Admin"),
  User = require("./models/User"),
  Cart = require("./models/ShoppingCart"),
  Comment = require("./models/comment"),
  Product = require("./models/Product"),
  Order = require("./models/orders"),
  validator =  require("express-validator"),
  Mongostore = require("connect-mongo")(session),
  methodOverride = require("method-override"); 

var classesRoutes = require("./routes/Classes"),
    AuthRoutes    = require("./routes/Auth"),
    CmsRoutes     = require("./routes/Cms"),
    CommenRoutes  = require("./routes/comment"),
    StoreRoutes   = require("./routes/store"),
    BlogRoutes    = require("./routes/blog");
// require routes
var stripe = require("stripe")("sk_test_4MDk0NmsXeYt1yVBpiwNrLQF");

// Token is created using Checkout or Elements!



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

app.use (flash());
app.use(methodOverride("_method"));
//use passport 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//global middleware
app.use(function(req,res,next){
  res.locals.session = req.session;
  res.locals.currentLogedUser =  req.user;
  next();
});
 app.use(classesRoutes);
 app.use(AuthRoutes);
 app.use(CmsRoutes);
 app.use(CommenRoutes);
 app.use(StoreRoutes);
 app.use(BlogRoutes);

 

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
  
}
})
app.get("/checkout", function(req,res){
  if(!req.session.cart){
    return res.redirect("/card");
  } else{
    var cart = new Cart(req.session.cart);
    res.render("./store/checkout", {products: cart.generateArray(),totalPrice: cart.totalPrice });
  }
});
app.post("/charge", function(req,res){

  if(!req.session.cart){
    return res.redirect("/card");
  }
var token = req.body.stripeToken;
var cart = new Cart(req.session.cart);

var chargeamount = cart.totalPrice * 100;
//Charge the user's card:
stripe.charges.create({
  amount: chargeamount,
  currency: "GBP",
  description: "Example charge",
  source: token,
}, function(err, charge) {
    if(err){
      console.log(err);
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.firstname,
      payementId: charge.id
    });
    order.save();
    req.session.cart = null;
    res.redirect("/");
});

});

app.listen(3000, function () {
  console.log("server is on!!");

})