

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extented: true}));

mongoose.connect("mongodb+srv://Admin-vedika:2g1m3t@cluster0.vvza8.mongodb.net/myFirstDatabase", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

const secret = "VedikaSankpal";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

const Data = new mongoose.model("Data", userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});


app.post("/register", function(req, res){
  const newUser = new Data({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
   Data.findOne({email: username}, function(err, foundUser){
     if (err) {
       console.log(err);
     } else {
       if (foundUser.password === password){
         res.render("secrets");
       }
     }
   });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server has been started at port 3000");
});
