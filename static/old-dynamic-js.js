    // JS for Testimony Form
    const testimonySubmit = document.getElementById("testimonySubmit");

    if (testimonySubmit) {
        testimonySubmit.addEventListener('click', handleTestimonyAcceptClick);
    }

    function handleTestimonyAcceptClick() {
        const today = new Date();
        const name = document.getElementById('testimonyName').value.trim();
        const desc = document.getElementById('testimonyInput').value.trim();
        const testimonyUrl = document.getElementById('testimonyImage').value;
        const alt = testimonyUrl === "" ? "No image provided." : "An image of WiCyS Club Activities!";

        if (!(name && desc)) {
            alert("Error: You must fill in at least your name and message!");
        } else {
            const processUrl = "/testimonials/addTestimony";

            fetch(processUrl, {
                method: "POST",
                body: JSON.stringify({ url: testimonyUrl, desc, name, date: today, alt }),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Testimony saved successfully!") {
                    alert("Testimony saved successfully!")
                    const testimonyTemplate = Handlebars.templates.singleTestimony;
                    const newTestimonyHTML = testimonyTemplate({ url: testimonyUrl, desc, name, alt });
                    const testimoniesSection = document.getElementById("testimonies-flex");
                    testimoniesSection.insertAdjacentHTML("beforeend", newTestimonyHTML);
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(err => {
                console.log("An error occurred saving the testimony.");
                console.error("Client-side error:", err);
            });
        }
    }


//JS for Testimony filtering:
//JS outline from assignment 5 --> source citation
var allTestimonies = []
var testimonyElems = document.getElementsByClassName('testimonial-post')

for (var i = 0; i < testimonyElems.length; i++) {
    console.log("Inspecting testimony element: ", testimonyElems[i]);  // Check the DOM element
    allTestimonies.push(parseTestimonyElem(testimonyElems[i]));
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

function insertNewTestimony(message, name, photoURL, date, alt){
    console.log("adding new testimony")


    console.log("adding message: " + message)
    console.log("adding name: " + name)
    console.log("adding url: " + photoURL)
    console.log("adding date: " + date)
    console.log("adding alt: " + alt)

    var testimonyContainer = document.getElementById("testimonies-flex");
    var data = {
        desc: message,
        name: name,
        url: photoURL,
        date: date,
        alt: alt
    };
    

    var html = Handlebars.templates["singleTestimony"](data);

    testimonyContainer.insertAdjacentHTML("beforeEnd", html)
}

function clearFiltersAndReinsertTestimonies() {
    document.getElementById('filter-text').value = ""
    document.getElementById('filter-start').value = ""
    document.getElementById('filter-end').value = ""
    document.getElementById('filter-image').value = "Both"

    doFilterUpdate()
}

/*
 * A function to apply the current filters to a specific testimony.  Returns true
 * if the testimony passes the filters and should be displayed and false otherwise.
 */
function testimonyPassesFilters(testimony, filters) {
    
    var passesText = true;
    if (filters.text) {
        var testimonyMessage = testimony.desc.toLowerCase();
        var testimonyName = testimony.name.toLowerCase();
        var filterText = filters.text.toLowerCase();
        if (testimonyMessage.indexOf(filterText) === -1 && testimonyName.indexOf(filterText) === -1) {
            console.log("filter text doesn't appear")
            passesText = false;
        }else{
            console.log("filter text appears")
        }
    }


    var passesStart = true;
    if (!isNaN(filters.startDate.getTime())) {
        // Ensure the testimony date is a valid Date object
        var testimonyDate = new Date(testimony.date);
        var filterDate = new Date(filters.startDate);
        console.log("date: " + testimonyDate)
        console.log("filters date: " + filterDate)
        if (isNaN(testimonyDate.getTime())) {
            console.log("filter date not in range")
            passesStart = false; // If testimony date is invalid, skip it
        } else {
            console.log("testimony date: ", testimonyDate)
            // Compare the testimony date with the filter start date
            if (testimonyDate.getTime() < filterDate.getTime()) {
                console.log("filter date not in range start")
                passesStart = false; // Testimony date is earlier than the filter start date
            }else{
                console.log("filter date in range start")
            }
        }
        
    }

    var passesEnd = true;
    if (!isNaN(filters.endDate.getTime())) {
        // Ensure the testimony date is a valid Date object
        var testimonyDate = new Date(testimony.date);
        var filterDate = new Date(filters.endDate);
        // Set filterDate to end of day for the endDate comparison
        filterDate.setUTCHours(23,59,59,999);
        console.log("date: " + testimonyDate)
        console.log("filters date: " + filterDate)
        if (isNaN(testimonyDate.getTime())) {
            console.log("filter date not in range")
            passesEnd = false; // If testimony date is invalid, skip it
        }else{
            console.log("testimony date: ", testimonyDate)
            // Compare the testimony date with the filter end date
            if (testimonyDate.getTime() > filterDate.getTime()) {
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
        if (filters.includeImage === "Yes") { //filtering includes testimonies with images
            console.log("yes images")
            if (!testimony.url) {
                passesImage = false;
            }
        }else{ //filtering includes testimonies without images
            console.log("no images")
            if(testimony.url){
                passesImage = false;
            }
        }
    }
    

    return passesImage && passesText && passesEnd && passesStart;
}

/*
 * Applies the filters currently entered by the user to the set of all testimonies.
 * Any testimony that satisfies the user's filter values will be displayed,
 * including testimonies that are not currently being displayed because they didn't
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
    
    var testimonyContainer = document.getElementById('testimonies-flex')
    var testimonyChildren = testimonyContainer.children

    // Reset testimony elements back to normal by making them visible again
    for (var j = 0; j < testimonyChildren.length;j++) {
        if (testimonyChildren[j].classList.contains('hidden')) {
            testimonyChildren[j].classList.remove('hidden')
        }
    }

    /*
     * "Remove" all "testimony" elements by hiding them.
     */ 
    var i = 0
    allTestimonies.forEach(function (testimony) {
        if (!(testimonyPassesFilters(testimony, filters))) {
            testimonyChildren[i].classList.add('hidden')
        }
        i++
    })
    
}


/*
 * This function parses an existing DOM element representing a single testimony
 * into an object representing that testimony and returns that object.  The object
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
function parseTestimonyElem(testimonyData) {
    var testimony = {};

    // Get the image element for the URL and alt text
    var testimonyImageElem = testimonyData.querySelector('.testimony-pic img');
    if (testimonyImageElem) {
        testimony.url = testimonyImageElem.src; // Get the image source
        testimony.alt = testimonyImageElem.alt; // Get the alt text
    } else {
        testimony.url = null;  // If no image, set to null
        testimony.alt = "No image provided"; // Default alt text
    }

    // Get the name from the h2 element
    var nameElem = testimonyData.querySelector('.testimony-text h2');
    if (nameElem) {
        testimony.name = nameElem.innerText.trim(); // Get the name text and trim any extra spaces
    } else {
        testimony.name = ''; // If no name found, set to empty string
    }

    // Get the description from the p element with the class "testimony-desc"
    var descElem = testimonyData.querySelector('.testimony-desc');
    if (descElem) {
        testimony.desc = descElem.innerText.trim(); // Get the description text and trim any extra spaces
    } else {
        testimony.desc = ''; // If no description found, set to empty string
    }

    // Get the date from a custom data attribute, data-date
    var dateElem = testimonyData.querySelector('[data-date]');
    if (dateElem) {
        testimony.date = new Date(dateElem.getAttribute('data-date')); // Convert date string to Date object
    } else {
        testimony.date = new Date(); // If no date found, set to current date
    }

    return testimony;
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

    // Fetch testimony data from the server
    fetch('/testimonyData.json')
        .then(response => response.json())
        .then(testimonyData => {
            console.log("Testimony Data fetched:", testimonyData);

            // Function to show the modal
            function showModal(event) {
                var button = event.target;
                console.log("Button clicked:", button);

                // Retrieve the index of the clicked button
                var index = button.getAttribute('data-index');
                var testimony = testimonyData[index]; // Use the index to get the correct testimony data

                // Debugging: Log data for modal
                console.log("Modal data:", testimony);

                // Update modal content
                modal.querySelector('.modal-header h3').textContent = testimony.name;
                modal.querySelector('.testimony-desc-full').textContent = testimony.desc;
                var img = modal.querySelector('.testimony-img-container img');
                img.src = testimony.url;
                img.alt = testimony.alt;
    
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
            console.error("Error fetching testimony data:", error);
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
