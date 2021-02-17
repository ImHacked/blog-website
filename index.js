//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hey,Welcome to my blog where you'll find more about my writing skills and some crispy things about Technology";
const aboutContent = "Hello, I am Aadesh currently studying Chemical Engineering at National Institute of Technology(Agartala).My interests include Web developement, Software developement,machine learning and AI as things I would like to grow and expand on. I have intermediate experience in Full Stack developent and basics of Machine learning.I can code in few languages like C,C++,Python and JavaScript. I'm also inclined towards arts so my favorite timepass is writing and Singing.I'm currently handling few social media platforms with about 2 million followers.I can do video and photo edits nicely.";
const contactContent = "Hope you liked my page for more info and to contact me click below";

const app = express();

mongoose.connect("mongodb+srv://aadesh:blog1234@cluster0.diumn.mongodb.net/blogDB?retryWrites=true&w=majority/blogDB");

const blogSchema = {
  Topic: String,
  Content: String
};

const Post = mongoose.model("Post", blogSchema);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  Post.find({}, function(err, posts){

    console.log(posts);

   res.render("home", {

     Content: homeStartingContent,

     Posts: posts

     });

 });


});

app.get("/about", function(req, res) {


  res.render("about", {
    Content: aboutContent
  });

});


app.get("/contact", function(req, res) {


  res.render("contact", {
    Content: contactContent
  });

});

app.get("/compose", function(req, res) {


  res.render("compose");

});

app.post("/compose", function(req, res) {

  const post = new Post({

    Topic: req.body.postTitle,

    Content: req.body.postBody

  });

  post.save(function(err){

  if (!err){

    res.redirect("/");

  }

});
});

app.get('/posts/:postId', function(req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     title:post.Topic,

     content: post.Content

   });

 });




});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
