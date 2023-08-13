const express = require("express");
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const User = require('./model/user.jsx');
const Post = require('./model/post.jsx');
const passport = require("./passport.jsx");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
const upload = multer({ storage: storage });

const routes = ["/", "/posts", "/my-posts", "/create", "/account", "/login", "/register"]

const router = express.Router();

router.get("/api/posts/:postId", (req, res) =>
{
  Post.findById(req.params.postId)
  .then((post) =>
  {
    const voteCount = post.votes.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.value ? 1 : -1),
      0
    );
    if(post.image.data)
    {
      res.json({voteCount: voteCount, title: post.title, content: post.content, date: post.date, postId: post.id, author: post.author, img: post.image.data.toString("base64")});
    }
    else
    {
      res.json({voteCount: voteCount, title: post.title, content: post.content, date: post.date, postId: post.id, author: post.author});
    }
  })
});

router.get("/api/posts", (req, res) =>
{
  Post.find({}).sort({date: -1})
  .then((posts) =>
  {
    const response = [];
    for(const post of posts)
    {
      const voteCount = post.votes.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.value ? 1 : -1),
        0
      );
      if(post.image.data)
      {
        response.push({voteCount: voteCount, title: post.title, content: post.content, date: post.date, postId: post.id, author: post.author, img: post.image.data.toString("base64")});
      }
      else
      {
        response.push({voteCount: voteCount, title: post.title, content: post.content, date: post.date, postId: post.id, author: post.author});
      }
    }

    res.json(response);
  })
});

router.get("/api/my-posts/:userId", (req, res) =>
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
            const voteCount = post.votes.reduce(
              (accumulator, currentValue) => accumulator + (currentValue.value ? 1 : -1),
              0
            );
            if(post.image.data)
            {
              response.push({voteCount: voteCount, title: post.title, content: post.content, date: post.date, postId: post.id, author: post.author, img: post.image.data.toString("base64")});
            }
            else
            {
              response.push({voteCount: voteCount, title: post.title, content: post.content, date: post.date, postId: post.id, author: post.author});
            }
          }
          res.json(response);
        })
      }
    }
    else
    {
      res.status(401);
      res.send("Unauthorized");
    }
});

router.get(routes, (req, res) =>
{
    res.sendFile(path.join(__dirname+"/../public/index.html"));
});



router.get("/api/posts/:postId/comments", (req, res) => {
  Post.findById(req.params.postId)
  .then((post) => {
    res.send(post.comments);
  })
  .catch((err) => {
    res.send(err);
  })
});

router.get("/api/posts/:postId/is_voted", (req, res) => {
  if(req.isAuthenticated())
  {
    Post.findById(req.params.postId)
    .then((post) => {
      const vote = post.votes.find(vote => vote.author.equals(req.user._id));
      if(!vote)
      {
        res.send("No vote");
      }
      else if(vote.value)
      {
        res.send("Like");
      }
      else
      {
        res.send("Dislike");
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  else
  {
    res.status(401);
    res.send("Unauthorized");
  }
});

router.get("*", (req, res) =>
{
    res.sendFile(path.join(__dirname+"/../public/index.html"));
});

router.post('/login',(req, res) => {
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

router.post('/register', (req, res) => {
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

router.post("/logged_in", (req, res) =>
{
  res.status(200)
  res.json({status: req.isAuthenticated(), username: req.user ? req.user.username  : ""});
});

router.post("/logout", (req, res) =>
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

router.post("/create", upload.single('image'), async (req, res) =>
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
    res.send("Unauthorized");
  }
});


router.post("/api/posts/:postId/comments", (req, res) => {
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

router.delete("/api/posts/:postId", (req, res) => {
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

router.patch("/api/edit/:postId", upload.single('image'), async (req, res) => {
  if(req.isAuthenticated())
  {
    try
    {
      if(req.file)
      {
        Post.findOneAndUpdate({_id: req.params.postId, author: req.user.username}, 
          { 
            title: req.body.title, 
            content: req.body.content, 
            image: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png',
          } 
        })
        .then(() => {
          fs.unlink(path.join(__dirname + '/uploads/' + req.file.filename), () => {});
        });

      }
      else if(req.body.deleteImage)
      {
        Post.findOneAndUpdate({_id: req.params.postId, author: req.user.username}, 
          { 
            title: req.body.title, 
            content: req.body.content, 
            image: {
                data: null,
                contentType: 'image/png',
          } 
        })
        .then();
      }
      else
      {
        Post.findOneAndUpdate({_id: req.params.postId, author: req.user.username}, 
          { 
            title: req.body.title, 
            content: req.body.content, 
        })
        .then();
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

router.put("/api/posts/:postId/votes", (req, res) => {
  if(req.isAuthenticated())
  {
    Post.findById(req.params.postId)
    .then((post) =>
    {
      const vote = post.votes.find(vote => vote.author.equals(req.user._id));
      if(!vote)
      {
        post.votes.push({author: req.user._id, value: req.body.vote});
      }
      else
      {
        if(vote.value === req.body.vote)
        {
          post.votes = post.votes.filter(postVote => postVote !== vote);
        }
        else
        {
          vote.value = req.body.vote;
        }
      }
      post.save();
      res.status(200);
      res.send();
    })
  }
  else
  {
    res.status(401);
    res.send("Unauthorized")
  }
})

module.exports = router;