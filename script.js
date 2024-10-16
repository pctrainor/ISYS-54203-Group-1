// Sample event data with categories (replace with actual data fetching logic)
const events = [
    { title: "Movie Night", date: "2023-10-15", time: "19:00", category: "Arts", description: "Join us for an outdoor movie night!" },
    { title: "Tech Talk", date: "2023-10-20", time: "14:00", category: "Academic", description: "Learn about the latest in AI technology." },
    { title: "Sports Tournament", date: "2023-10-25", time: "10:00", category: "Sports", description: "Annual inter-college sports tournament." }
];

// Function to display events
function displayEvents(eventsToShow) {
    const eventList = document.getElementById('event-list');
    if (!eventList) return; // Guard clause in case the element doesn't exist on the current page
    eventList.innerHTML = '';
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

// Display initial events if on the home page
if (document.getElementById('event-list')) {
    displayEvents(events);
}

// Search functionality
const searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.category.toLowerCase().includes(searchTerm)
        );
        displayEvents(filteredEvents);
    });
}

// Event listener for category clicks
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryName = category.querySelector('p').textContent;
        window.location.href = `EventsByCategory.html?category=${categoryName}`;
    });
});

// Function to filter events by category (for use in EventsByCategory.html)
function filterEventsByCategory(category) {
    return events.filter(event => event.category.toLowerCase() === category.toLowerCase());
}
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