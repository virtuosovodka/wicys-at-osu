var path = require('path');
var filePath = path.join(__dirname, 'static', 'blogData.json'); // Correct path to the file
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var Handlebars = require('handlebars');

// Read the blog data file synchronously at startup
var blogData = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // Use fs.readFileSync to read the file

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
        firstPost: blogData[0].desc,
        slides: slidesData
    };
    res.status(200).render("homePage", context);
});

// Display About page
app.get('/about', function (req, res, next) {
    res.status(200).render("aboutPage");
});

// Display Events page
app.get('/events', function (req, res, next) {
    res.status(200).render("eventsPage");
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

// Display 404 page
app.get('*', function (req, res, next) {
    res.status(404).render("404Page");
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
