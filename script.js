// Sample data for upcoming events
const events = [
    { title: "Music Concert", date: "2023-11-20", time: "18:00", description: "Enjoy a night of classical music.", location: "University Auditorium" },
    { title: "Art Exhibition", date: "2023-11-22", time: "10:00", description: "Explore modern art pieces.", location: "Art Gallery" },
    { title: "Basketball Game", date: "2023-11-25", time: "15:00", description: "Watch the campus teams compete.", location: "Sports Complex" },
];

// Function to display upcoming events
function displayUpcomingEvents() {
    // Sort events by date (soonest first)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get the container where events will be displayed
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
});
