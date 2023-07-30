require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const passport = require('passport');
require("./src/passportConfig.jsx")(passport);
const session = require('express-session');
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const client = require("./src/db.jsx");
const cookieParser = require("cookie-parser");
const countVotes = require("./src/countVote.jsx");

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.user_id,
      username: user.email,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.static("public"));
app.use(bp.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

const routes = ["/", "/posts", "/my-posts", "/create", "/account", "/login", "/register"]

app.get("/api/posts/:postId", async (req, res) =>
{
  try
  {
    const voteCount = countVotes(await client.query("SELECT * FROM votes WHERE post_id = $1", [req.params.postId]));

    const result = await client.query("SELECT * FROM posts INNER JOIN users ON users.user_id=posts.author WHERE post_id = $1", [req.params.postId]);
    const post = result.rows[0];
    if(post.post_image)
    {
      res.json({voteCount:voteCount, title: post.post_title, content: post.post_message, date: post.create_time, postId: post.post_id, author: post.email, img: post.post_image.toString("base64")});
    }
    else
    {
      res.json({voteCount:voteCount, title: post.post_title, content: post.post_message, date: post.create_time, postId: post.post_id, author: post.email});
    }
  }
  catch(err)
  {
    console.log(err);
  }
});

app.get("/api/posts", async (req, res) =>
{
    const posts = await client.query("SELECT * FROM posts ORDER BY create_time DESC");
    const response = [];
    for(const post of posts.rows)  
    {
      if(post.post_image)
      {
        response.push({title: post.post_title, content: post.post_message, date: post.create_time, postId: post.post_id, author: post.email, img: post.post_image.toString("base64")});
      }
      else
      {
        response.push({title: post.post_title, content: post.post_message, date: post.create_time, postId: post.post_id, author: post.email});
      }
    }
    res.json(response);
});

app.get("/api/my-posts/:userId", async (req, res) =>
{
    if(req.isAuthenticated())
    {
      if(req.params.userId === req.user.username)
      {
        const posts = await client.query("SELECT * FROM posts WHERE author = $1 ORDER BY create_time DESC", [req.user.id]);
        const response = [];
        for(const post of posts.rows)  
        {
          if(post.post_image)
          {
            response.push({title: post.post_title, content: post.post_message, date: post.create_time, postId: post.post_id, author: post.email, img: post.post_image.toString("base64")});
          }
          else
          {
            response.push({title: post.post_title, content: post.post_message, date: post.create_time, postId: post.post_id, author: post.email});
          }
        }
        res.json(response);
      }
    }
    else
    {
      res.status(401);
      res.send("Unauthorized");
    }
});

app.get(routes, (req, res) =>
{
    res.sendFile(__dirname+"/public/index.html");
});



app.get("/api/posts/:postId/comments", async (req, res) => {
  try
  {
    const comments = await client.query("SELECT email AS author, comments.create_date, comments.content FROM comments INNER JOIN users ON users.user_id = comments.author WHERE post_id = $1 ORDER BY create_date ASC", [req.params.postId]);
    res.status(200);
    res.send(comments.rows);
  }
  catch(err)
  {
    console.log(err);
  }
});

app.get("/api/posts/:postId/is_voted", async (req, res) => {
  if(req.isAuthenticated())
  {
    const vote = (await client.query("SELECT * FROM votes WHERE post_id=$1 AND user_id=$2", [req.params.postId, req.user.id])).rows[0];
    if(vote === undefined)
    {
      res.status(200);
      res.send("No vote");
    }
    else if(vote.vote)
    {
      res.status(200);
      res.send("Like");
    }
    else
    {
      res.status(200);
      res.send("Dislike");
    }
  }
  else
  {
    res.status(401);
    res.send("Unauthorized");
  }
});

app.get("*", (req, res) =>
{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/login",
  passport.authenticate("local-login", { session: true }),
  (req, res) => {
    res.status(200);
    res.json({ user: req.user });
  }
);

app.post("/register",
  passport.authenticate("local-signup", { session: true }),
  (req, res) => {
    res.status(200);
    res.json({
      user: req.user,
    });
  }
);

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
      if(req.file)
      {
        const image = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
        await client.query("INSERT INTO posts (author, post_title, post_message, post_image) VALUES ($1, $2, $3, $4)", [req.user.id, req.body.title, req.body.content, image]);
        fs.unlink(path.join(__dirname + '/uploads/' + req.file.filename), () => {});
      }
      else
      {
        await client.query("INSERT INTO posts (author, post_title, post_message) VALUES ($1, $2, $3)", [req.user.id, req.body.title, req.body.content]);
      }
  
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
    res.send("Unauthorized");
  }
});


app.post("/api/posts/:postId/comments", async (req, res) => {
  if(req.isAuthenticated())
  {
    try
    {
      await client.query("INSERT INTO comments (author, post_id, content) VALUES ($1, $2, $3)", [req.user.id, req.params.postId, req.body.content]);
      res.status(200);
      res.send();
    }
    catch(err)
    {
      console.log(err);
    }
  }
  else
  {
    res.status(401);
    res.send("Unauthorized");
  }
});

app.delete("/api/posts/:postId", async (req, res) => {
  if(req.isAuthenticated())
  {
    await client.query("DELETE FROM posts WHERE post_id = $1" , [req.params.postId]);
    res.status(200);
    res.send();
  }
  else
  {
    res.status(401);
    res.send("Unauthorized");
  }
});

app.patch("/api/edit/:postId", upload.single('image'), async (req, res) => {
  if(req.isAuthenticated())
  {
    try
    {
      if(req.file)
      {
        await client.query("UPDATE posts SET post_title=$1, post_message=$2, post_image=$3 WHERE post_id=$4", 
          [req.body.title, req.body.content, fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), req.params.postId]);
        
        fs.unlink(path.join(__dirname + '/uploads/' + req.file.filename), () => {});

      }
      else if(req.body.deleteImage)
      {
        await client.query("UPDATE posts SET post_title=$1, post_message=$2, post_image=NULL WHERE post_id=$3", 
          [req.body.title, req.body.content, req.params.postId]);
      }
      else
      {
        await client.query("UPDATE posts SET post_title=$1, post_message=$2 WHERE post_id=$3", 
          [req.body.title, req.body.content, req.params.postId]);
      }
      
  
      res.status(200);
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
    res.send("Unauthorized");
  }
});

app.put("/api/posts/:postId/votes", async (req, res) => {
  if(req.isAuthenticated())
  {
      const oldVote = (await client.query("SELECT vote FROM votes WHERE post_id=$1 AND user_id=$2", [req.params.postId, req.user.id])).rows[0];
      if(oldVote === undefined)
      {
        await client.query("INSERT INTO votes (vote, post_id, user_id) VALUES ($1, $2, $3)", [req.body.vote, req.params.postId, req.user.id]);
      }
      else if(req.body.vote === oldVote.vote)
      {
        await client.query("DELETE FROM votes WHERE post_id=$1 AND user_id=$2", [req.params.postId, req.user.id]);
      }
      else
      {
        await client.query("UPDATE votes SET vote=$1 WHERE post_id=$2 AND user_id=$3", [req.body.vote, req.params.postId, req.user.id]);
      }
      res.status(200);
      res.send();
  }
  else
  {
    res.status(401);
    res.send("Unauthorized")
  }
})

app.listen(3000);