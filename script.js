// This is our list of events. In a real app, this would come from a database.
const events = [
    { title: "Movie Night", date: "2023-10-15", time: "19:00", category: "Arts", description: "Join us for an outdoor movie night!" },
    { title: "Tech Talk", date: "2023-10-20", time: "14:00", category: "Academic", description: "Learn about the latest in AI technology." },
    { title: "Sports Tournament", date: "2023-10-25", time: "10:00", category: "Sports", description: "Annual inter-college sports tournament." },
    { title: "Music Concert", date: "2023-11-20", time: "18:00", category: "Music", description: "Enjoy a night of classical music.", location: "University Auditorium" },
    { title: "Art Exhibition", date: "2023-11-22", time: "10:00", category: "Arts", description: "Explore modern art pieces.", location: "Art Gallery" },
    { title: "Basketball Game", date: "2023-11-25", time: "15:00", category: "Sports", description: "Watch the campus teams compete.", location: "Sports Complex" },
];

// Load events from localStorage when the page loads
const storedEvents = JSON.parse(localStorage.getItem('events'));
if (storedEvents) {
    events.push(...storedEvents);
}
// This function displays the events on the webpage
function displayEvents(eventsToShow) {
    const eventList = document.getElementById('event-list');
    if (!eventList) return; // If there's no place to show events, exit the function
    eventList.innerHTML = ''; // Clear out any old events

    eventsToShow.forEach(event => {
        const eventCard = document.createElement('div'); // Create a box for each event
        eventCard.className = 'event-card'; // Give it a style
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Category: ${event.category}</p>
            <p>${event.description}</p>
            <button id="addToCalendarButton">Add to Calendar</button>
        `;
        // Make the event clickable to show more details
        eventCard.addEventListener('click', () => {
            const url = `EventDetails.html?title=${encodeURIComponent(event.title)}&date=${encodeURIComponent(event.date)}&time=${encodeURIComponent(event.time)}&location=${encodeURIComponent(event.location || '')}`;
            window.location.href = url; // Go to the event details page
        });
        eventList.appendChild(eventCard); // Add the event to the page
    });
}

// This function sets up the button to add an event to a calendar
function setupAddToCalendarButton(eventDetails) {
    const addToCalendarButton = document.getElementById('addToCalendarButton');
    if (!addToCalendarButton) return; // If there's no button, exit the function

    addToCalendarButton.addEventListener('click', () => {
        const icsContent = createICSFile(eventDetails); // Create a calendar file
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Create a link to download the file
        link.download = 'event.ics'; // Name the file
        document.body.appendChild(link);
        link.click(); // Start the download
        document.body.removeChild(link);

        alert('Event .ics file has been downloaded. You can now import this into your calendar application.');
    });
}

// This function creates the content for a calendar file
function createICSFile(eventDetails) {
    // Helper function to format dates correctly
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Set the start and end dates for the event
    const startDate = formatDate(eventDetails.startDate);
    const endDate = formatDate(eventDetails.endDate);

    // Return the calendar file content
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Company//Your Product//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@yourdomain.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`;
}

// This function creates a shareable link for an event
function shareEvent(event) {
    const eventData = {
        title: event.title,
        date: event.date,
        time: event.time,
        category: event.category,
        description: event.description
    };
    const eventString = encodeURIComponent(JSON.stringify(eventData)); // Encode the event data
    const link = `https://yourwebsite.com/event?data=${eventString}`; // Create a link
    navigator.clipboard.writeText(link) // Copy the link to the clipboard
        .then(() => {
            alert('Event link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// This function searches for events based on user input
function searchEvents(query) {
    query = query.toLowerCase(); // Make the query lowercase for comparison
    return events.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        (event.category && event.category.toLowerCase().includes(query))
    ); // Return events that match the query
}

// This function filters events by category
function filterEventsByCategory(category) {
    return events.filter(event => event.category && event.category.toLowerCase() === category.toLowerCase());
}

// When the page loads, show all events if we're on the home page
if (document.getElementById('event-list')) {
    displayEvents(events);
}

// Set up what happens when someone clicks on a category
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the link from going straight to the page
        const categoryName = category.querySelector('p').textContent;
        window.location.href = `EventsByCategory.html?category=${categoryName}`; // Go to the category page
    });
});

// Make the calendar days change color when you hover over them
const days = document.querySelectorAll('.day');
days.forEach(day => {
    day.addEventListener('mouseover', () => {
        day.style.backgroundColor = '#ddd'; // Light gray on hover
    });
    day.addEventListener('mouseout', () => {
        day.style.backgroundColor = '#eee'; // Back to original color
    });
});

// Add event listener to the login form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the form from submitting
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@uark\.edu$/; // Pattern for UARK email
    const errorMessageElement = document.getElementById('error-message');

    if (!emailPattern.test(email)) {
        errorMessageElement.textContent = 'Invalid credentials. Please use a UARK email address (e.g., @uark.edu).';
        errorMessageElement.style.display = 'block'; // Show error message
    } else if (password === "") {
        errorMessageElement.textContent = 'Password cannot be empty.';
        errorMessageElement.style.display = 'block'; // Show error message
    } else {
        errorMessageElement.style.display = 'none'; // Hide error message
        alert('Login successful!');
    }
});

// New code for event creation form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventCreationForm');
    const submitButton = document.getElementById('submitButton');
    const errorMessageElement = document.getElementById('error-message');

    // Enable/disable submit button based on form validity
    form.addEventListener('input', () => {
        if (form.checkValidity()) {
            submitButton.disabled = false;
            errorMessageElement.style.display = 'none'; // Hide error message if form is valid
        } else {
            submitButton.disabled = true;
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const eventName = form.eventName.value.trim();
        const eventDate = new Date(form.eventDate.value);
        const eventTime = form.eventTime.value;
        const eventLocation = form.eventLocation.value.trim();
        const eventCategory = form.eventCategory.value.trim();
        const eventDescription = form.eventDescription.value.trim();

        // Validate the form inputs
        let errorMessage = '';
        if (!eventName) errorMessage += 'Event Name is required. ';
        if (!eventLocation) errorMessage += 'Event Location is required. ';
        if (!eventCategory) errorMessage += 'Event Category is required. ';
        if (!eventDescription) errorMessage += 'Event Description is required. ';
        if (eventDate <= new Date()) errorMessage += 'Event Date must be in the future. ';

        if (errorMessage) {
            errorMessageElement.textContent = errorMessage;
            errorMessageElement.style.display = 'block';
            return;
        }

        errorMessageElement.style.display = 'none'; // Hide error message

        // Add the new event to the events list
        events.push({
            title: eventName,
            date: form.eventDate.value, // Store as string for consistency
            time: eventTime,
            location: eventLocation,
            category: eventCategory,
            description: eventDescription
        });

        // Store events in localStorage or send to server if applicable
        localStorage.setItem('events', JSON.stringify(events));
        // Create a confirmation page
        document.body.innerHTML = `
            <div class="confirmation-page">
                <h1>Event Created Successfully</h1>
                <p>Your event has been created successfully. Here are the details:</p>
                <p><strong>Name:</strong> ${eventName}</p>
                <p><strong>Date:</strong> ${eventDate.toDateString()}</p>
                <p><strong>Time:</strong> ${eventTime}</p>
                <p><strong>Location:</strong> ${eventLocation}</p>
                <p><strong>Category:</strong> ${eventCategory}</p>
                <p><strong>Description:</strong> ${eventDescription}</p>
                <button id="goHomeButton">Go to Home Page</button>
            </div>
        `;

        // Add event listener to the "Go to Home Page" button
        document.getElementById('goHomeButton').addEventListener('click', () => {
            window.location.href = 'Home.html'; // Redirect to the home page
        });

        // Log to console as a mock for sending a confirmation email
        console.log('Confirmation email sent to organizer.');
    });
});
