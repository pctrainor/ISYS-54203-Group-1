// This is our list of events. In a real app, this would come from a database.

const events = [

    { title: "Movie Night", date: "2023-10-15", time: "19:00", category: "Arts", description: "Join us for an outdoor movie night!" },

    { title: "Tech Talk", date: "2023-10-20", time: "14:00", category: "Academic", description: "Learn about the latest in AI technology." },

    { title: "Sports Tournament", date: "2023-10-25", time: "10:00", category: "Sports", description: "Annual inter-college sports tournament." }

];


// This function puts events on the page

function displayEvents(eventsToShow) {

    // Find the place on the page where we want to show events

    const eventList = document.getElementById('event-list');

    // If there's no place to put events, stop here

    if (!eventList) return;

    

    // Clear out any old events that might be there

    eventList.innerHTML = '';

    

    // For each event, create a card and add it to the page

    eventsToShow.forEach(event => {

        // Create a new 'card' for each event

        const eventCard = document.createElement('article');

        eventCard.className = 'event';

        // Fill the card with event information

        eventCard.innerHTML = `

            <h3>${event.title}</h3>

            <p>Date: ${event.date}</p>

            <p>Time: ${event.time}</p>

            <p>Category: ${event.category}</p>

            <p>${event.description}</p>

            <a href="#" class="event-details">View Details</a>

        `;

        // Add the card to the page

        eventList.appendChild(eventCard);

    });

}


// This function finds events that match what the user searched for

function searchEvents(query) {

    // Make the search work no matter if people use capital letters or not

    query = query.toLowerCase();

    

    // Look through all events and return ones that match the search

    return events.filter(event => 

        event.title.toLowerCase().includes(query) ||

        event.description.toLowerCase().includes(query) ||

        event.category.toLowerCase().includes(query)

    );

}


// This function finds events in a specific category

function filterEventsByCategory(category) {

    // Return events that match the given category

    return events.filter(event => event.category.toLowerCase() === category.toLowerCase());

}


// When the page loads, show all events if we're on the home page

if (document.getElementById('event-list')) {

    displayEvents(events);

}


// Set up what happens when someone clicks on a category

document.querySelectorAll('.category').forEach(category => {

    category.addEventListener('click', (e) => {

        // Stop the default link behavior

        e.preventDefault();

        // Get the name of the category that was clicked

        const categoryName = category.querySelector('p').textContent;

        // Go to a new page showing events for that category

        window.location.href = `EventsByCategory.html?category=${categoryName}`;

    });

});


// Make the calendar days change color when you hover over them

const days = document.querySelectorAll('.day');

days.forEach(day => {

    // When the mouse goes over a day, make it darker

    day.addEventListener('mouseover', () => {

        day.style.backgroundColor = '#ddd';

    });

    // When the mouse leaves a day, make it lighter again

    day.addEventListener('mouseout', () => {

        day.style.backgroundColor = '#eee';

    });

})
// ... (Your existing JavaScript code) ...

// Function to generate a shareable link for an event
function shareEvent(event) {
    const eventData = {
      title: event.title,
      date: event.date,
      time: event.time,
      category: event.category,
      description: event.description
    };
  
    const eventString = encodeURIComponent(JSON.stringify(eventData));
    const link = `https://yourwebsite.com/event?data=${eventString}`; 
  
    // Copy the link to the clipboard
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Event link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
  
  // This function puts events on the page
  function displayEvents(eventsToShow) {
    // ... (Your existing displayEvents function code) ...
  
    // Add share button to each event card
    eventsToShow.forEach(event => {
      // ... (Your existing event card creation code) ...
  
      // Add a "Share" button to the event card
      const shareButton = document.createElement('button');
      shareButton.textContent = 'Share';
      shareButton.addEventListener('click', () => shareEvent(event));
      eventCard.appendChild(shareButton);
  
      // Add the card to the page
      eventList.appendChild(eventCard);
    });
  }

  //Login.error.js
// Add event listener to the form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get email and password input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@uark\.edu$/; // Regex for UARK email
    const errorMessageElement = document.getElementById('error-message');

    // Check if the email matches the UARK pattern
    if (!emailPattern.test(email)) {
        errorMessageElement.textContent = 'Invalid credentials. Please use a UARK email address (e.g., @uark.edu).';
        errorMessageElement.style.display = 'block'; // Show the error message
    } else if (password === "") {
        errorMessageElement.textContent = 'Password cannot be empty.';
        errorMessageElement.style.display = 'block'; // Show error if password is empty
    } else {
        errorMessageElement.style.display = 'none'; // Hide the error message if email is valid
        // Proceed with form submission or further actions
        alert('Login successful!'); // Replace with actual login logic
    }
});
