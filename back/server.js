const express = require("express");
const bp = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bp.urlencoded({extended: true}));

app.get("/", (req, res) =>
{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/", (req, res) =>
{
    console.log(req.body.test);
});

app.listen(3000);