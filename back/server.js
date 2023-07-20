require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
    password: String,
}); 

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("Users", userSchema);

passport.use(User.createStrategy());

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

const app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(bp.urlencoded({extended: true}));
app.use(express.json());


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
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

app.post('/login',(req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    req.logIn(user, (err) =>
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        passport.authenticate('local')(req, res, () => {
          res.send('success');
        })
      }
    })
  });

app.post('/register', (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
      console.log(err);
      res.send('There was an error');
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('success');
      })
    }
  })
})

app.post("/logged_in", (req, res) =>
{
  res.status(200)
  res.send(req.isAuthenticated());
});

app.post("/logout", (req, res) =>
{
  req.logout((err) =>
  {
    if(err)
    {
      console.log(err);
    }
  });
  res.status(200);
  res.send("success");
});

app.listen(3000);