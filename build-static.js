#!/usr/bin/env node

/**
 * Static site generator for WICYS @ OSU
 * Generates static HTML files from Express templates for GitHub Pages deployment
 * Original server.js remains unchanged for future NUC deployment
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const loadPosts = require('./loadPosts');

// Register the same helper as in server.js
Handlebars.registerHelper('encodeContent', function(content) {
    if (!content) return '';
    return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
});

// Register partials
const partialsDir = path.join(__dirname, 'views', 'partials');
fs.readdirSync(partialsDir).forEach(file => {
    const partialName = path.parse(file).name;
    const partialPath = path.join(partialsDir, file);
    const partialContent = fs.readFileSync(partialPath, 'utf-8');
    Handlebars.registerPartial(partialName, partialContent);
});

// Load layout
const layoutPath = path.join(__dirname, 'views', 'layouts', 'main.handlebars');
const layout = fs.readFileSync(layoutPath, 'utf-8');

// Load blog posts and images
const blogData = loadPosts();
let slidesData = require('./images.json');

// Fix image paths in slidesData to point to static/
slidesData = slidesData.map(slide => ({
    ...slide,
    url: slide.url.replace(/^\.\/images\//, './static/images/')
}));

// Create output directory
const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Compile and write a page
 */
function compilePage(viewName, context) {
    const viewPath = path.join(__dirname, 'views', `${viewName}.handlebars`);
    const viewContent = fs.readFileSync(viewPath, 'utf-8');

    // Compile view
    const viewTemplate = Handlebars.compile(viewContent);
    const bodyHtml = viewTemplate(context);

    // Inject into layout
    const layoutTemplate = Handlebars.compile(layout);
    const fullHtml = layoutTemplate({ body: bodyHtml });

    return fullHtml;
}

/**
 * Write HTML file with path corrections for GitHub Pages
 */
function writePage(filePath, html) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Calculate relative path depth to root
    const relativeToRoot = path.relative(path.dirname(filePath), outputDir);
    const depth = relativeToRoot === '' ? '' : relativeToRoot + '/';

    // Replace absolute paths with relative paths
    const pages = ['blog', 'resources', 'events', 'contact', 'sponsor'];
    let correctedHtml = html
        // Handle href="/" -> site home (index.html relative to current page)
        .replace(/href="\/"/g, `href="${depth}index.html"`)
        // Handle page nav links like /resources, /blog, etc.
        .replace(/href="\/(blog|resources|events|contact|sponsor)"/g, `href="${depth}$1/index.html"`)
        // Handle asset hrefs like /style.css, /images/... -> static/
        .replace(/href="\/([^"]+)"/g, `href="${depth}static/$1"`)
        // Handle src paths like /images/... -> static/
        .replace(/src="\/([^"]+)"/g, `src="${depth}static/$1"`)
        // Fix relative src paths like ./blog.js -> static/blog.js
        .replace(/src="\.\/([\w\.]+)"/g, `src="${depth}static/$1"`);

    // Single quotes
    correctedHtml = correctedHtml
        .replace(/href='\/'/g, `href='${depth}index.html'`)
        .replace(/href='\/(blog|resources|events|contact|sponsor)'/g, `href='${depth}$1/index.html'`)
        .replace(/href='\/([^']+)'/g, `href='${depth}static/$1'`)
        .replace(/src='\/([^']+)'/g, `src='${depth}static/$1'`)
        .replace(/src='\.\/([\w\.]+)'/g, `src='${depth}static/$1'`);

    fs.writeFileSync(filePath, correctedHtml);
    console.log(`✓ Generated: ${path.relative(outputDir, filePath)}`);
}

console.log('Building static site...\n');

// Home page
const homeContext = {
    firstPost: blogData[0] ? blogData[0].desc : '',
    slides: slidesData
};
writePage(path.join(outputDir, 'index.html'), compilePage('homePage', homeContext));

// Blog page
const blogContext = { blogData };
writePage(path.join(outputDir, 'blog', 'index.html'), compilePage('blogPage', blogContext));

// Resources page
writePage(path.join(outputDir, 'resources', 'index.html'), compilePage('resourcesPage', {}));

// Events page
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString('en-US', options);
const eventsContext = { today };
writePage(path.join(outputDir, 'events', 'index.html'), compilePage('eventsPage', eventsContext));

// Contact page
writePage(path.join(outputDir, 'contact', 'index.html'), compilePage('contactPage', {}));

// Sponsor page (if needed)
writePage(path.join(outputDir, 'sponsor', 'index.html'), compilePage('sponsorPage', {}));

// 404 page
writePage(path.join(outputDir, '404.html'), compilePage('404Page', {}));

// Copy static files
const staticDir = path.join(__dirname, 'static');
const distStaticDir = path.join(outputDir, 'static');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

copyDir(staticDir, distStaticDir);

// Copy images to static/images (since HTML paths point there)
const imagesDir = path.join(__dirname, 'images');
if (fs.existsSync(imagesDir)) {
    copyDir(imagesDir, path.join(distStaticDir, 'images'));
}

console.log('\n✅ Static site built successfully!');
console.log(`📁 Output directory: ./dist`);
console.log('\nTo deploy to GitHub Pages:');
console.log('  1. Push the dist folder to the gh-pages branch');
console.log('  2. Enable GitHub Pages in repository settings');
