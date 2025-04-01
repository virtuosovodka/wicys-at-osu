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


	//JS for Blog Post filtering:
	var allPosts = []
	var postElems = document.getElementsByClassName('blog-post')

	for (var i = 0; i < postElems.length; i++) {
		console.log("Inspecting post element: ", postElems[i]);  // Check the DOM element
		allTestimonies.push(parsePostElem(postElems[i]));
	}

	//Check if the filter button exists
	var filterUpdateButton = document.getElementById('filter-update-button');

	if (filterUpdateButton) {
		console.log("filter button: ", filterUpdateButton)

		filterUpdateButton.addEventListener('click', function() {
			console.log('Filter button clicked');
			doFilterUpdate(); 
		});
	}

	function clearFiltersAndReinsertTestimonies() {
		document.getElementById('filter-text').value = ""
		document.getElementById('filter-start').value = ""
		document.getElementById('filter-end').value = ""
		document.getElementById('filter-image').value = "Both"

		doFilterUpdate()
	}

	/*
	 * A function to apply the current filters to a specific blog post.  Returns true
	 * if the blog passes the filters and should be displayed and false otherwise.
	 */
	function postPassesFilters(post, filters) {

		var passesText = true;
		if (filters.text) {
			var postMessage = post.desc.toLowerCase();
			var postName = post.name.toLowerCase();
			var filterText = filters.text.toLowerCase();
			if (postMessage.indexOf(filterText) === -1 && postName.indexOf(filterText) === -1) {
				console.log("filter text doesn't appear")
				passesText = false;
			}else{
				console.log("filter text appears")
			}
		}


		var passesStart = true;
		if (!isNaN(filters.startDate.getTime())) {
			// Ensure the post date is a valid Date object
			var postDate = new Date(post.date);
			var filterDate = new Date(filters.startDate);
			console.log("date: " + postDate)
			console.log("filters date: " + filterDate)
			if (isNaN(postDate.getTime())) {
				console.log("filter date not in range")
				passesStart = false; // If post date is invalid, skip it
			} else {
				console.log("post date: ", postDate)
				// Compare the post date with the filter start date
				if (postDate.getTime() < filterDate.getTime()) {
					console.log("filter date not in range start")
					passesStart = false; // Testimony date is earlier than the filter start date
				}else{
					console.log("filter date in range start")
				}
			}

		}

		var passesEnd = true;
		if (!isNaN(filters.endDate.getTime())) {
			// Ensure the post date is a valid Date object
			var postDate = new Date(post.date);
			var filterDate = new Date(filters.endDate);
			// Set filterDate to end of day for the endDate comparison
			filterDate.setUTCHours(23,59,59,999);
			console.log("date: " + postDate)
			console.log("filters date: " + filterDate)
			if (isNaN(postDate.getTime())) {
				console.log("filter date not in range")
				passesEnd = false; // If post date is invalid, skip it
			}else{
				console.log("post date: ", postDate)
				// Compare the post date with the filter end date
				if (postDate.getTime() > filterDate.getTime()) {
					console.log("filter date not in range end")
					passesEnd = false; // Testimony date is later than the filter end date
				}else{
					console.log("filter date in range end")
				}
			}


		}

		// Do no image filtering if user wants both 
		var passesImage = true;
		if (!(filters.includeImage === "Both")) {
			if (filters.includeImage === "Yes") { //filtering includes posts with images
				console.log("yes images")
				if (!post.url) {
					passesImage = false;
				}
			}else{ //filtering includes posts without images
				console.log("no images")
				if(post.url){
					passesImage = false;
				}
			}
		}


		return passesImage && passesText && passesEnd && passesStart;
	}

	/*
	 * Applies the filters currently entered by the user to the set of all posts.
	 * Any post that satisfies the user's filter values will be displayed,
	 * including posts that are not currently being displayed because they didn't
	 * satisfy an old set of filters.  Testimonies that don't satisfy the filters are
	 * removed from the DOM.
	 */
	function doFilterUpdate() {
		/*
		 * Grab values of filters from user inputs.
		 */

		var filters = {
			text: document.getElementById('filter-text').value.trim(),
			startDate: new Date(document.getElementById('filter-start').value), // Convert to Date object
			endDate: new Date(document.getElementById('filter-end').value), // Convert to Date object
			includeImage: document.getElementById('filter-image').value // Either "Yes" or "No"
		}

		var postContainer = document.getElementById('blog-flex')
		var postChildren = postContainer.children

		// Reset post elements back to normal by making them visible again
		for (var j = 0; j < postChildren.length;j++) {
			if (postChildren[j].classList.contains('hidden')) {
				postChildren[j].classList.remove('hidden')
			}
		}

		/*
		 * "Remove" all "post" elements by hiding them.
		 */ 
		var i = 0
		allTestimonies.forEach(function (post) {
			if (!(postPassesFilters(post, filters))) {
				postChildren[i].classList.add('hidden')
			}
			i++
		})

	}


	/*
	 * This function parses an existing DOM element representing a single post
	 * into an object representing that post and returns that object.  The object
	 * is structured like this:
	 *
	 * {
	 *   name: "...",
	 *   desc: "...",
	 *   url: ...,
	 *   alt: "...",
	 *   date: "..."
	 * }
	 */
	function parsePostElem(postData) {
		var post = {};

		// Get the image element for the URL and alt text
		var postImageElem = postData.querySelector('.blog-pic img');
		if (postImageElem) {
			post.url = postImageElem.src; // Get the image source
			post.alt = postImageElem.alt; // Get the alt text
		} else {
			post.url = null;  // If no image, set to null
			post.alt = "No image provided"; // Default alt text
		}

		// Get the name from the h2 element
		var nameElem = postData.querySelector('.blog-text h2');
		if (nameElem) {
			post.name = nameElem.innerText.trim(); // Get the name text and trim any extra spaces
		} else {
			post.name = ''; // If no name found, set to empty string
		}

		// Get the description from the p element with the class "blog-desc"
		var descElem = postData.querySelector('.blog-desc');
		if (descElem) {
			post.desc = descElem.innerText.trim(); // Get the description text and trim any extra spaces
		} else {
			post.desc = ''; // If no description found, set to empty string
		}

		// Get the date from a custom data attribute, data-date
		var dateElem = postData.querySelector('[data-date]');
		if (dateElem) {
			post.date = new Date(dateElem.getAttribute('data-date')); // Convert date string to Date object
		} else {
			post.date = new Date(); // If no date found, set to current date
		}

		return post;
	}


	// JS for Testimony Modals
	// Debugging: Ensure the script is running
	console.log("Script is running");

	// Modal element references (Ensure these exist on the page before interacting with them)
	var modal = document.getElementById('read-more-modal');
	var modalBackdrop = document.getElementById('modal-backdrop');
	var modalCloseButton = document.getElementById('modal-close');

	// Debugging: Check if modal elements are found
	if (modal && modalBackdrop && modalCloseButton) {
		console.log("Modal:", modal);
		console.log("Modal Backdrop:", modalBackdrop);
		console.log("Modal Close Button:", modalCloseButton);

		// Fetch post data from the server
		fetch('/postData.json')
			.then(response => response.json())
			.then(postData => {
				console.log("Post Data fetched:", postData);

				// Function to show the modal
				function showModal(event) {
					var button = event.target;
					console.log("Button clicked:", button);

					// Retrieve the index of the clicked button
					var index = button.getAttribute('data-index');
					var post = postData[index]; // Use the index to get the correct post data

					// Debugging: Log data for modal
					console.log("Modal data:", post);

					// Update modal content
					modal.querySelector('.modal-header h3').textContent = post.name;
					modal.querySelector('.blog-desc-full').textContent = post.desc;
					var img = modal.querySelector('.post-img-container img');
					img.src = post.url;
					img.alt = post.alt;

					// Show the modal
					modal.classList.remove('hidden');
					modalBackdrop.classList.remove('hidden');
					console.log("Modal displayed.");
				}

				// Function to hide the modal
				function hideModal() {
					modal.classList.add('hidden');
					modalBackdrop.classList.add('hidden');
					console.log("Modal hidden.");
				}


				// Attach event listeners to "Read More" buttons if they exist
				var readMoreButtons = document.querySelectorAll('.readMore');
				console.log("Found Read More Buttons:", readMoreButtons);

				// Safeguard: Check if readMoreButtons exist and attach listeners
				if (readMoreButtons.length === 0) {
					console.warn("No Read More buttons found. Check your HTML structure and class names.");
				} else {
					readMoreButtons.forEach(function (button, index) {
						// Store the index on the button element to pass to the modal function
						button.setAttribute('data-index', index);
						button.addEventListener('click', showModal);
						console.log("Event listener attached to button:", button);
					});
				}

				// Attach event listener to close button
				modalCloseButton.addEventListener('click', hideModal);
				console.log("Event listener attached to modal close button.");

				// Ensure clicking on the backdrop also closes the modal
				modalBackdrop.addEventListener('click', hideModal);
			})
			.catch(error => {
				console.error("Error fetching post data:", error);
			});
	} else {
		console.error("Modal or related elements not found. Please ensure they exist in the HTML structure.");
	}



	// Safeguard for Contact Form Elements
	var nameVal = document.getElementById("contactName");
	var email = document.getElementById("contactEmail");
	var phone = document.getElementById("contactPhone");
	var message = document.getElementById("contactInput");
	var submitButton = document.getElementById("contactSubmit");

	// Safeguard: Ensure elements exist before attaching event listeners
	if (nameVal && email && phone && message && submitButton) {
		// Function to clear input fields
		function clearInput() {
			nameVal.value = '';
			email.value = '';
			phone.value = '';
			message.value = '';
		}

		// Function to handle form submission
		function submitContact() {
			console.log("here");

			// Check if all fields are filled
			if (nameVal.value == '' || email.value == '' || phone.value == '' || message.value == '') {
				alert('All fields must be completed');
			} else {
				alert('Thanks for reaching out!');
				clearInput(); // Clear input fields after submission
			}
		}

		// Attach event listener to submit button
		submitButton.addEventListener("click", submitContact);
	} else {
		console.error("Contact form elements not found. Ensure the correct IDs are applied.");
	}

	// Safeguard for Navbar Hamburger Menu Interaction
	// Ensure the menu icon exists before adding event listener
	var menuIcon = document.querySelector('.menu-icon');
	var navbarMenu = document.querySelector('.navbar ul');

	if (menuIcon && navbarMenu) {
		menuIcon.addEventListener('click', function() {
			navbarMenu.classList.toggle('active');
		});
	} else {
		console.error("Navbar menu or menu icon not found. Ensure the correct class names are applied.");
	}

})


