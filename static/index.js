document.addEventListener('DOMContentLoaded', function () {
	// JS for Slides
	const slides = document.querySelectorAll('.slide');
	const nextSlideButton = document.querySelector('.next-slide');
	const prevSlideButton = document.querySelector('.prev-slide');

	if (slides.length > 0 && nextSlideButton && prevSlideButton) {
		let currentSlide = 0;

		nextSlideButton.addEventListener('click', () => {
			slides[currentSlide].classList.remove('active');
			currentSlide = (currentSlide + 1) % slides.length;
			slides[currentSlide].classList.add('active');
		});

		prevSlideButton.addEventListener('click', () => {
			slides[currentSlide].classList.remove('active');
			currentSlide = (currentSlide - 1 + slides.length) % slides.length;
			slides[currentSlide].classList.add('active');
		});
	}

	// for invite link
	if (window.location.pathname == "/contact.html") {
		link = document.getElementById('ils');
		link.setAttribute("href", atob("aHR0cHM6Ly9kaXNjb3JkLmdnL1BVdjNDejlQeks="));
	}

	// JS for Blog Post filtering
	var allPosts = [];
	var postElems = document.getElementsByClassName('blog-post');

	// Parse all posts on page load
	for (var i = 0; i < postElems.length; i++) {
		console.log("Inspecting post element: ", postElems[i]);
		allPosts.push(parsePostElem(postElems[i]));
	}

	// Check if the filter elements exist
	var filterTextInput = document.getElementById('filter-text');
	var filterStartInput = document.getElementById('filter-start');
	var filterEndInput = document.getElementById('filter-end');
	var filterImageSelect = document.getElementById('filter-image');

	// Add event listener to filter reset button
	var resetButton = document.getElementById('filter-reset-button');
	resetButton.addEventListener('click', clearFiltersAndShowAllPosts);

	// Add input event listeners to automatically update filters when inputs change
	if (filterTextInput) {
		filterTextInput.addEventListener('input', function () {
			// Add debounce for better performance
			clearTimeout(filterTextInput.debounceTimer);
			filterTextInput.debounceTimer = setTimeout(doFilterUpdate, 300);
		});
	}

	if (filterStartInput) {
		filterStartInput.addEventListener('change', doFilterUpdate);
	}

	if (filterEndInput) {
		filterEndInput.addEventListener('change', doFilterUpdate);
	}

	if (filterImageSelect) {
		filterImageSelect.addEventListener('change', doFilterUpdate);
	}

	if (filterUpdateButton) {
		console.log("Filter button found:", filterUpdateButton);
		filterUpdateButton.addEventListener('click', doFilterUpdate);
	} else {
		console.log("Filter button not found");
	}

	function clearFiltersAndShowAllPosts() {
		// Clear all filter inputs
		if (filterTextInput) filterTextInput.value = "";
		if (filterStartInput) filterStartInput.value = "";
		if (filterEndInput) filterEndInput.value = "";
		if (filterImageSelect) filterImageSelect.value = "Both";

		// Show all posts
		var postContainer = document.getElementById('blog-flex');
		if (postContainer) {
			var postChildren = postContainer.children;
			for (var j = 0; j < postChildren.length; j++) {
				postChildren[j].classList.remove('hidden');
			}
		}

		console.log("All filters cleared, showing all posts");
	}

	/*
	 * A function to apply the current filters to a specific blog post.  Returns true
	 * if the blog passes the filters and should be displayed and false otherwise.
	 */
	function postPassesFilters(post, filters) {
		console.log("Checking post against filters:", post.name);

		// Text filter check - now using includes() for partial string matching
		var passesText = true;
		if (filters.text) {
			var postName = (post.name || '').toLowerCase();
			var postDesc = (post.desc || '').toLowerCase();
			var filterText = filters.text.toLowerCase();

			// Use includes() for partial string matching
			if (!postName.includes(filterText) && !postDesc.includes(filterText)) {
				console.log("Post doesn't pass text filter");
				passesText = false;
			} else {
				console.log("Post passes text filter");
			}
		}

		// Start date filter check
		var passesStart = true;
		if (filters.startDate && !isNaN(filters.startDate.getTime())) {
			// Ensure post date is valid
			var postDate = post.date instanceof Date ? post.date : new Date(post.date);

			if (isNaN(postDate.getTime())) {
				console.log("Post has invalid date");
				passesStart = false;
			} else if (postDate < filters.startDate) {
				console.log("Post doesn't pass start date filter");
				passesStart = false;
			} else {
				console.log("Post passes start date filter");
			}
		}

		// End date filter check
		var passesEnd = true;
		if (filters.endDate && !isNaN(filters.endDate.getTime())) {
			// Ensure post date is valid
			var postDate = post.date instanceof Date ? post.date : new Date(post.date);
			var filterEndDate = new Date(filters.endDate);
			// Set end date to end of day
			filterEndDate.setHours(23, 59, 59, 999);

			if (isNaN(postDate.getTime())) {
				console.log("Post has invalid date");
				passesEnd = false;
			} else if (postDate > filterEndDate) {
				console.log("Post doesn't pass end date filter");
				passesEnd = false;
			} else {
				console.log("Post passes end date filter");
			}
		}

		// Image filter check
		var passesImage = true;
		if (filters.includeImage !== "Both") {
			var hasImage = !!post.url;

			if (filters.includeImage === "Yes" && !hasImage) {
				console.log("Post doesn't pass image=Yes filter");
				passesImage = false;
			} else if (filters.includeImage === "No" && hasImage) {
				console.log("Post doesn't pass image=No filter");
				passesImage = false;
			} else {
				console.log("Post passes image filter");
			}
		}

		var passes = passesText && passesStart && passesEnd && passesImage;
		console.log(`Post "${post.name}" overall filter result: ${passes ? "PASS" : "FAIL"}`);
		return passes;
	}

	/*
	 * Applies the filters currently entered by the user to the set of all posts.
	 * Any post that satisfies the user's filter values will be displayed,
	 * including posts that are not currently being displayed because they didn't
	 * satisfy an old set of filters. Posts that don't satisfy the filters are
	 * hidden.
	 */
	function doFilterUpdate() {
		console.log("Applying filters to posts");

		// Check if all filters are empty - if so, show all posts
		var isTextEmpty = !filterTextInput || filterTextInput.value.trim() === "";
		var isStartEmpty = !filterStartInput || filterStartInput.value === "";
		var isEndEmpty = !filterEndInput || filterEndInput.value === "";
		var isImageDefault = !filterImageSelect || filterImageSelect.value === "Both";

		if (isTextEmpty && isStartEmpty && isEndEmpty && isImageDefault) {
			console.log("All filters are empty, showing all posts");
			clearFiltersAndShowAllPosts();
			return;
		}

		/*
		 * Grab values of filters from user inputs.
		 */
		var filters = {
			text: filterTextInput ? filterTextInput.value.trim() : "",
			startDate: filterStartInput ? new Date(filterStartInput.value) : new Date(0),
			endDate: filterEndInput ? new Date(filterEndInput.value) : new Date(0),
			includeImage: filterImageSelect ? filterImageSelect.value : "Both"
		};

		console.log("Filter values:", {
			text: filters.text,
			startDate: filterStartInput ? filterStartInput.value : "",
			endDate: filterEndInput ? filterEndInput.value : "",
			includeImage: filters.includeImage
		});

		// Reset all post visibilities first
		var postContainer = document.getElementById('blog-flex');
		if (!postContainer) {
			console.error("Blog container not found!");
			return;
		}

		var postChildren = postContainer.children;

		// Reset all posts to visible
		for (var j = 0; j < postChildren.length; j++) {
			postChildren[j].classList.remove('hidden');
		}

		// Hide posts that don't pass the filters
		for (var i = 0; i < allPosts.length; i++) {
			if (!postPassesFilters(allPosts[i], filters)) {
				if (i < postChildren.length) {
					postChildren[i].classList.add('hidden');
				}
			}
		}

		console.log("Filter application complete");
	}

	/*
	 * This function parses an existing DOM element representing a single post
	 * into an object representing that post and returns that object.
	 */
	function parsePostElem(postElem) {
		var post = {};

		// Get the image element
		var postImageElem = postElem.querySelector('.blog-pic img');
		if (postImageElem) {
			post.url = postImageElem.src;
			post.alt = postImageElem.alt || "Blog image";
		} else {
			post.url = null;
			post.alt = null;
		}

		// Get the title from h2 element
		var titleElem = postElem.querySelector('.blog-text h2');
		if (titleElem) {
			post.name = titleElem.textContent.trim();
		} else {
			post.name = "";
		}

		// Get the description text
		var descElem = postElem.querySelector('.blog-desc');
		if (descElem) {
			post.desc = descElem.textContent.trim();
		} else {
			post.desc = "";
		}

		// Get the date - look for a data-date attribute at various levels
		var dateElem = postElem.querySelector('[data-date]') || postElem;
		var dateStr = dateElem.getAttribute('data-date');

		if (dateStr) {
			post.date = new Date(dateStr);
			// If date parsing failed, set to a default date
			if (isNaN(post.date.getTime())) {
				console.warn("Invalid date found:", dateStr);
				post.date = new Date(); // Fallback to current date
			}
		} else {
			console.warn("No date attribute found for post:", post.name);
			post.date = new Date(); // Default to current date
		}

		console.log("Parsed post:", post);
		return post;
	}

	// Model Functionality
	var modal = document.getElementById('read-more-modal');
	var modalBackdrop = document.getElementById('modal-backdrop');
	var modalCloseButton = document.getElementById('modal-close');

	if (modal && modalBackdrop && modalCloseButton) {
		// Function to show the modal
		function showModal(event) {
			var button = event.currentTarget;
			var postElement = button.closest('.blog-post');
			var post = parsePostElem(postElement);

			// Update modal content
			modal.querySelector('.modal-header h3').textContent = post.name;
			modal.querySelector('.blog-desc-full').textContent = post.desc;

			var modalImg = modal.querySelector('.blog-img-container img');
			var modalImgContainer = modal.querySelector('.blog-img-container');

			if (post.url) {
				modalImg.src = post.url;
				modalImg.alt = post.alt || "Blog image";
				modalImgContainer.classList.remove('hidden');
			} else {
				modalImgContainer.classList.add('hidden');
			}

			// Show the modal
			modal.classList.remove('hidden');
			modalBackdrop.classList.remove('hidden');
		}

		// Function to hide the modal
		function hideModal() {
			modal.classList.add('hidden');
			modalBackdrop.classList.add('hidden');
		}

		// Attach event listeners to "Read More" buttons
		var readMoreButtons = document.querySelectorAll('.readMore');

		readMoreButtons.forEach(function (button) {
			button.addEventListener('click', showModal);
		});

		// Attach event listener to close button
		modalCloseButton.addEventListener('click', hideModal);

		// Ensure clicking on the backdrop also closes the modal
		modalBackdrop.addEventListener('click', hideModal);
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

})


