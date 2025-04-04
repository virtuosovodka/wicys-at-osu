document.addEventListener('DOMContentLoaded', function () {
    let slideIndex = 1;
    let slideInterval;
    const slideDelay = 8000; // Change image every 8 seconds
    
    // Initialize slideshow
    function initSlideshow() {
        const slides = document.getElementsByClassName("slides");
        
        // If no slides, exit function
        if (slides.length === 0) return;
        
        // Initialize the first slide
        showSlides(slideIndex);
        
        // Add event listeners to controls
        const prev = document.querySelector(".prev");
        const next = document.querySelector(".next");
        
        if (prev) prev.addEventListener("click", () => {
            clearInterval(slideInterval); // Stop auto-slideshow when manually navigating
            plusSlides(-1);
            startAutoSlide(); // Restart auto-slideshow after manual navigation
        });
        
        if (next) next.addEventListener("click", () => {
            clearInterval(slideInterval); // Stop auto-slideshow when manually navigating
            plusSlides(1);
            startAutoSlide(); // Restart auto-slideshow after manual navigation
        });
        
        // Start automatic slideshow
        startAutoSlide();
    }
    
    // Start automatic slideshow
    function startAutoSlide() {
        // Clear any existing interval first
        clearInterval(slideInterval);
        
        // Set new interval
        slideInterval = setInterval(() => {
            plusSlides(1);
        }, slideDelay);
    }
    
    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    // Show specific slide
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    // Show slides
    function showSlides(n) {
        const slides = document.getElementsByClassName("slides");
        
        // If no slides, exit function
        if (slides.length === 0) return;
        
        // Handle boundary cases
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        
        // Hide all slides first
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }
        
        // Show the active slide
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add("active");
    }
    
    // Initialize the slideshow when the DOM is loaded
    initSlideshow();
    
    // Additional code for other parts of your site
    // for invite link
    if (window.location.pathname == "/contact.html") {
        let link = document.getElementById('ils');
        if (link) {
            link.setAttribute("href", atob("aHR0cHM6Ly9kaXNjb3JkLmdnL1BVdjNDejlQeks="));
        }
    }

    // Safeguard for Navbar Hamburger Menu Interaction
    const menuToggle = document.getElementById('menu-toggle');
    const navbarItems = document.querySelector('.navbar-items');

    if (menuToggle && navbarItems) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                navbarItems.style.display = 'flex';
            } else {
                navbarItems.style.display = '';
            }
        });
    }
});