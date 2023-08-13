require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const router = require("./src/router.jsx");
const passport = require("./src//passport.jsx");





mongoose.connect("mongodb://127.0.0.1:27017/MaxForum");
mongoose.pluralize(null);





const app = express();
app.use(express.static("public"));
app.use(bp.urlencoded({extended: true}));
app.use(express.json());


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));


app.use("/", router);


app.listen(3000);