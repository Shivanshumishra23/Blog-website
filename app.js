//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require ("mongoose");

const homeStartingContent = "Welcome to our user-friendly blog website! Here, you can easily create and explore a diverse range of blogs, catering to your unique interests. Whether you're a writer or a reader, our platform provides a space for sharing and discovering captivating content across various subjects.";
const aboutContent = "Welcome to our user-friendly blog website! We are a passionate team dedicated to fostering a vibrant online community where creativity and knowledge converge. Our mission is to empower individuals, whether writers or readers, to express themselves freely and engage in meaningful discussions.Our platform provides a seamless experience for creating and discovering a diverse array of blogs. With a commitment to inclusivity, we welcome bloggers from all walks of life to share their unique perspectives and insights.Powered by cutting-edge technologies such as Node.js, Express, and MongoDB, we ensure a secure and efficient environment for content creation and management. Our goal is to make your blogging journey as enjoyable and rewarding as possible.Join us on this exciting adventure of expression, exploration, and connection. Whether you're here to share your stories or discover new ones, our blog website is your gateway to a world of captivating content across a multitude of subjects. Thank you for being a part of our vibrant community!";
const contactContent = "We value your input and are always here to assist you. If you have any questions, suggestions, or just want to say hello, don't hesitate to get in touch with us.You can reach out to us through the contact form below, and our dedicated team will promptly respond to your inquiries. Your feedback is essential to us, as it helps us improve our platform and provide you with an even better experience.We're committed to making your journey on our blog website as smooth and enjoyable as possible. Whether you need technical support, want to collaborate, or simply want to connect with like-minded individuals, we're here to facilitate those connections.Join our growing community, and let's create a thriving ecosystem of knowledge sharing and creativity. Thank you for choosing our platform, and we look forward to hearing from you!   My mail id 'mishrashivanshu2004@gmail.com'"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose
// .connect('mongodb://127.0.0.1:27017/blog')
// .then(()=>console.log("Mongodb connected"))
// .catch((err)=>console.log("Mongo Error" ,err));



mongoose.connect("mongodb+srv://mishrashivanshu2004:bUh2E1osxDqQ9kDP@cluster0.obrslbg.mongodb.net/?retryWrites=true&w=majority/blogDB").then(()=>{console.log("Connected to database")}).catch(()=>{console.log("Error connecting databse")})



const composeSchema ={
  title :String,
  content : String
};
const Post = mongoose.model("Post",composeSchema)
app.get("/", function(req, res){
  Post.find({}).then((foundPosts)=>{
    res.render("home", {
      startingContent: homeStartingContent,
      posts: foundPosts
      });
  })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save()


  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  Post.find({}).then((foundPosts)=>{
    foundPosts.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("post", {
          title: post.title,
          content: post.content
        });
      }
    });
  })

});

app.listen(7351, function() {
  console.log("Server started on port 7351");
});
