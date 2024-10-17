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
    
    // Loop through each event and create HTML elements for display
    events.forEach(event => {
        // Create a clickable div for each event
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>${event.description}</p>
        `;
        // Make the entire event card clickable
        eventCard.addEventListener('click', () => {
            // Construct URL with event details as query parameters
            const url = `EventDetails.html?title=${encodeURIComponent(event.title)}&date=${encodeURIComponent(event.date)}&time=${encodeURIComponent(event.time)}&location=${encodeURIComponent(event.location)}`;
            window.location.href = url;
        });

        // Append the event card to the event list container
        eventList.appendChild(eventCard);
    });
}

// When the page loads, show all events if we're on the home page
window.onload = displayUpcomingEvents;
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
