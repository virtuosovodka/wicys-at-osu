var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var Handlebars = require('handlebars');

Handlebars.registerHelper('encodeContent', function(content) {
    return content ? content.replace(/"/g, '&quot;') : '';
});

var loadPosts = require('./loadPosts');

// Load blog posts from markdown files in /posts
var blogData = loadPosts();

var slidesData = require("./images.json");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static'))); // Serve static files from 'static'

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, 'static')));

// Display Home page
app.get('', function (req, res, next) {
    var context = {
        firstPost: blogData[0] ? blogData[0].desc : '',
        slides: slidesData
    };
    res.status(200).render("homePage", context);
});

// Display About page
// app.get('/about', function (req, res, next) {
//     res.status(200).render("aboutPage");
// });

// Display Sponsor page
app.get('/sponsor', function (req, res, next) {
    res.status(200).render("sponsorPage");
});

// Display Resources page
app.get('/resources', function (req, res, next) {
    res.status(200).render("resourcesPage");
});

// Display Events page
app.get('/events', function (req, res, next) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    today = new Date().toLocaleDateString('en-US', options);
    res.status(200).render("eventsPage", {today: today});
});

// Display Contact page
app.get('/contact', function (req, res, next) {
    res.status(200).render("contactPage");
});

// Display Blog page
app.get('/blog', function (req, res, next) {
    var context = {
        blogData: blogData
    };
    res.status(200).render("blogPage", context);
});

// // Display individual blog post page
// app.get('/blog/:slug', function (req, res, next) {
//     var post = blogData.find(function (p) {
//         return p.title.toLowerCase().replace(/\s+/g, '-') === req.params.slug;
//     });
//     if (!post) return next();
//     res.status(200).render("blogPostPage", { post: post });
// });

// Display 404 page
app.get('*', function (req, res, next) {
    res.status(404).render("404Page");
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});