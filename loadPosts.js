var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var { marked } = require('marked');

function loadPosts() {
    var postsDir = path.join(__dirname, 'posts');
    if (!fs.existsSync(postsDir)) return [];
    return fs.readdirSync(postsDir)
        .filter(function (file) { return file.endsWith('.md'); })
        .map(function (file) {
            var raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
            var parsed = matter(raw);

            var dateObj = new Date(parsed.data.date);
            var formattedDate = !isNaN(dateObj)
                ? dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : parsed.data.date || '';

            return {
                title: parsed.data.title || '',
                desc: parsed.data.desc || marked.parse(parsed.content).replace(/<[^>]+>/g, '').slice(0, 200) + '...',
                fullContent: marked.parse(parsed.content),
                url: parsed.data.url || '',
                alt: parsed.data.alt || '',
                date: formattedDate
            };
        })
        .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
}

module.exports = loadPosts;