const express = require("express");
const bp = require("body-parser");


const app = express();
app.use(express.static("public"));
app.use(bp.urlencoded({extended: true}));

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

app.post("/", (req, res) =>
{
    console.log(req.body.test);
});

app.listen(3000);