require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./src/model/user.jsx');
const Post = require("./src/model/post.jsx");
const multer = require('multer');
const fs = require("fs");
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

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



passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

const routes = ["/", "/posts", "/my-posts", "/create", "/account", "/login", "/register"]

app.get("/api/posts/:postId", (req, res) =>
{
  Post.findById(req.params.postId)
  .then((post) =>
  {
    if(post.image.data)
    {
      res.json({title: post.title, content: post.content, date: post.date, postId: post.id, img: post.image.data.toString("base64")});
    }
    else
    {
      res.json({title: post.title, content: post.content, date: post.date, postId: post.id});
    }
  })
});

app.get("/api/posts", (req, res) =>
{
  Post.find({}).sort({date: -1})
  .then((posts) =>
  {
    const response = [];
    for(const post of posts)
    {
      if(post.image.data)
      {
        response.push({title: post.title, content: post.content, date: post.date, postId: post.id, img: post.image.data.toString("base64")});
      }
      else
      {
        response.push({title: post.title, content: post.content, date: post.date, postId: post.id});
      }
    }

    res.json(response);
  })
});

app.get("/api/my-posts/:userId", (req, res) =>
{
    if(req.isAuthenticated())
    {
      if(req.params.userId === req.user.username)
      {
        Post.find({author: req.user.username}).sort({date: -1})
        .then((posts) =>
        {
          const response = [];
          for(const post of posts)
          {
            if(post.image.data)
            {
              response.push({title: post.title, content: post.content, date: post.date, postId: post.id, img: post.image.data.toString("base64")});
            }
            else
            {
              response.push({title: post.title, content: post.content, date: post.date, postId: post.id});
            }
          }
          res.json(response);
        })
      }
    }
    else
    {
      res.status(401);
      res.send();
    }
});

app.get(routes, (req, res) =>
{
    res.sendFile(__dirname+"/public/index.html");
});



app.get("/api/posts/:postId/comments", (req, res) => {
  Post.findById(req.params.postId)
  .then((post) => {
    res.send(post.comments);
  })
  .catch((err) => {
    res.send(err);
  })
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
      res.status(400);
      res.send("Auth error");
    }
    else
    {
        passport.authenticate('local', {failureMessage: "Couldn`t authenticate"})(req, res, () => {
        res.send('success');
      })
    }
  })
});

app.post('/register', (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
      if(err.code === 11000)
      {
        res.status(200);
        res.send("email taken");
      }
      else
      {
        res.send(err.message);
      }
    } 
    else 
    {
      const authenticate = User.authenticate();
      authenticate(req.body.username, req.body.password, function(err, result, error) {
        if(err)
        {
          res.send(err);
        }
        if(result)
        {
          passport.authenticate('local')(req, res, () => {
            res.send('success');
          })
        }
      })
    }
  })
})

app.post("/logged_in", (req, res) =>
{
  res.status(200)
  res.json({status: req.isAuthenticated(), username: req.user ? req.user.username  : ""});
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

app.post("/create", upload.single('image'), async (req, res) =>
{
  if(req.isAuthenticated())
  {
    try
    {
      const post = new Post({
          author: req.user.username,
          title: req.body.title,
          content: req.body.content,
          image: {
            data: req.file ? fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)) : null,
            contentType: 'image/png',
          },
      });

      if(req.file)
      {
        fs.unlink(path.join(__dirname + '/uploads/' + req.file.filename), () => {});
      }

      await post.save();
  
      res.status(201);
      res.send("success");
    }
    catch(error)
    {
      res.status(200);
      res.send(error.message);
    }
  }
  else
  {
    res.status(401);
    res.send("Unauthorized response");
  }
});



app.post("/api/posts/:postId/comments", (req, res) => {
  if(req.isAuthenticated())
  {
    Post.findByIdAndUpdate(req.params.postId,
      { $push: { comments: {content: req.body.content, author: req.user.username}  } })
    .then((post) => {
      res.status(201);
      res.send();
    })
    .catch((err) => {
      res.send(err);
    })
  }
  else
  {
    res.status(401);
    res.send("Unauthorized");
  }
});

app.delete("/api/posts/:postId", (req, res) => {
  if(req.isAuthenticated())
  {
    Post.deleteOne({_id: req.params.postId, author: req.user.username})
    .then(() =>{
      res.status(200);
      res.send("Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else
  {
    res.status(401);
    res.send("Unauthorized");
  }
});

app.listen(3000);