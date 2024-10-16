// This is our list of events. In a real app, this would come from a database.
const events = [
    { title: "Movie Night", date: "2023-10-15", time: "19:00", category: "Arts", description: "Join us for an outdoor movie night!" },
    { title: "Tech Talk", date: "2023-10-20", time: "14:00", category: "Academic", description: "Learn about the latest in AI technology." },
    { title: "Sports Tournament", date: "2023-10-25", time: "10:00", category: "Sports", description: "Annual inter-college sports tournament." }
];

// This function puts events on the page
function displayEvents(eventsToShow) {
    const eventList = document.getElementById('event-list');
    // If there's no place to put events, stop here
    if (!eventList) return;
    
    // Clear out any old events
    eventList.innerHTML = '';
    
    // For each event, create a card and add it to the page
    eventsToShow.forEach(event => {
        const eventCard = document.createElement('article');
        eventCard.className = 'event';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Category: ${event.category}</p>
            <p>${event.description}</p>
            <a href="#" class="event-details">View Details</a>
        `;
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
    return events.filter(event => event.category.toLowerCase() === category.toLowerCase());
}

// When the page loads, show all events if we're on the home page
if (document.getElementById('event-list')) {
    displayEvents(events);
}

// Event listener for category clicks
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryName = category.querySelector('p').textContent;
        window.location.href = `EventsByCategory.html?category=${categoryName}`;
    });
});
// Original code for day hover effects
const days = document.querySelectorAll('.day');
days.forEach(day => {
    day.addEventListener('mouseover', () => {
        day.style.backgroundColor = '#ddd';
    });
    day.addEventListener('mouseout', () => {
        day.style.backgroundColor = '#eee';
    });
});
