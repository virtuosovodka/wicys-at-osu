document.addEventListener('DOMContentLoaded', function() {
    // Get all "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.readMore');
    
    // Add click event to each button
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent testimonial
            const testimonialPost = this.closest('.testimonial-post');
            const description = testimonialPost.querySelector('.testimony-desc');
            
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
    
    console.log('Testimonials JS loaded successfully');
});

