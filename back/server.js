require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});



passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
));


mongoose.connect("mongodb://127.0.0.1:27017/MaxForum");
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true,
    }
}); 

const User = mongoose.model("Users", userSchema);

const app = express();
app.use(express.static("public"));
app.use(bp.urlencoded({extended: true}));
app.use(express.json());


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use(passport.authenticate('session'));

const routes = ["/", "/posts", "/my-posts", "/create", "/account", "/login", "/register"]

app.get(routes, (req, res) =>
{
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/posts/:postId", (req, res) =>
{
    res.sendFile(__dirname+"/public/index.html");
});

app.get("*", (req, res) =>
{
    res.sendFile(__dirname+"/public/index.html");
});

app.post('/login', passport.authenticate('local'));

app.post("/register", (req, res) =>
{
  bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        password: hash,
      });

      user.save()
      .then(() =>
      {
          res.status(200);
          res.send("success");
      })
      .catch((err) => 
      {
        if(err.code === 11000)
        {
          res.status(200);
          res.send("email taken");
        }
        else
        {
          res.send(err);
        }
        req.login(user,(err) => {
          console.log(err);
        })
      });
    })
    .catch((err) => {
      console.log(err);
    });

  
});



app.listen(3000);