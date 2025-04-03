document.addEventListener('DOMContentLoaded', function () {
	// JS for Slides - https://www.w3schools.com/howto/howto_js_slideshow.asp
	window.onload = function() {
		slideIndex = 0;
		showSlides();
	};

	document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
	document.querySelector(".next").addEventListener("click", () => plusSlides(1));

	// Next/previous controls
	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	// Thumbnail image controls
	function currentSlide(n) {
		showSlides(slideIndex = n);
	}

	// automatically scroll through the slides
	function showSlides() {
		let i;
		let slides = document.getElementsByClassName("slides");
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slideIndex++;
		if (slideIndex > slides.length) {slideIndex = 1}
		slides[slideIndex-1].style.display = "block";
		setTimeout(showSlides, 8000); // Change image every 8 seconds
	} 

	// for invite link
	if (window.location.pathname == "/contact.html") {
		link = document.getElementById('ils');
		link.setAttribute("href", atob("aHR0cHM6Ly9kaXNjb3JkLmdnL1BVdjNDejlQeks="));
	}

	// Safeguard for Navbar Hamburger Menu Interaction
	// Ensure the menu icon exists before adding event listener
	var menuIcon = document.querySelector('.menu-icon');
	var navbarMenu = document.querySelector('.navbar ul');

	if (menuIcon && navbarMenu) {
		menuIcon.addEventListener('click', function () {
			navbarMenu.classList.toggle('active');
		});
	} else {
		console.error("Navbar menu or menu icon not found. Ensure the correct class names are applied.");
	}

	// 

})


