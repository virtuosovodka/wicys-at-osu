document.addEventListener('DOMContentLoaded', function () {
    // JS for Slides
    const slides = document.querySelectorAll('.slide');
    const nextSlideButton = document.querySelector('.next-slide');
    const prevSlideButton = document.querySelector('.prev-slide');

    if (slides.length > 0 && nextSlideButton && prevSlideButton) {
        let currentSlide = 0;

        // Next slide button click handler
        nextSlideButton.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        });

        // Previous slide button click handler
        prevSlideButton.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        });
    }
    // for invite link
    if (window.location.pathname=="/contact.html"){
        link=document.getElementById('ils');
        link.setAttribute("href",atob("aHR0cHM6Ly9kaXNjb3JkLmdnL1BVdjNDejlQeks="));
    }
})
