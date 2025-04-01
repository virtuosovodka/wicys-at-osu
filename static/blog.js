document.addEventListener('DOMContentLoaded', function() {
    // Get all "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.readMore');
    
    // Add click event to each button
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent blog post
            const blogPost = this.closest('.blog-post');
            const description = blogPost.querySelector('.blog-desc');
            
            // Toggle between showing full or truncated text
            if (this.textContent === 'Read More') {
                description.classList.add('expanded');
                this.textContent = 'Read Less';
            } else {
                description.classList.remove('expanded');
                this.textContent = 'Read More';
            }
        });
    });
    
    console.log('Blog JS loaded successfully');
});

