let path = require('path');
let express = require('express');
let exphbs = require('express-handlebars');
let fs = require('fs');
let Handlebars = require('handlebars');
const helmet = require('helmet');

Handlebars.registerHelper('encodeContent', function(content) {
    if (!content) return '';
    return content
        .replace(/&/g, '&amp;')   // must be first
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
});

let loadPosts = require('./loadPosts');

// Load blog posts from markdown files in /posts
let blogData = loadPosts();

let slidesData = require("./images.json");

let app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "fonts.googleapis.com", "cdnjs.cloudflare.com"],
      },
    },
  }),
);
let port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static'))); // Serve static files from 'static'

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, 'static')));

// Display Home page
app.get('', function (req, res, next) {
    let context = {
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
    let context = {
        blogData: blogData
    };
    res.status(200).render("blogPage", context);
});

// // Display individual blog post page
// app.get('/blog/:slug', function (req, res, next) {
//     let post = blogData.find(function (p) {
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