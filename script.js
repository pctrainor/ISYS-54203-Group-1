// This is our list of events. In a real app, this would come from a database.
const events = [
    { title: "Movie Night", date: "2023-10-15", time: "19:00", category: "Arts", description: "Join us for an outdoor movie night!"},
    { title: "Tech Talk", date: "2023-10-20", time: "14:00", category: "Academic", description: "Learn about the latest in AI technology." },
    { title: "Sports Tournament", date: "2023-10-25", time: "10:00", category: "Sports", description: "Annual inter-college sports tournament." },
    { title: "Music Concert", date: "2023-11-20", time: "18:00", category: "Music", description: "Enjoy a night of classical music.", location: "University Auditorium" },
    { title: "Art Exhibition", date: "2023-11-22", time: "10:00", category: "Arts", description: "Explore modern art pieces.", location: "Art Gallery" },
    { title: "Basketball Game", date: "2023-11-25", time: "15:00", category: "Sports", description: "Watch the campus teams compete.", location: "Sports Complex" },
];

// This function puts events on the page
function displayEvents(eventsToShow) {
    const eventList = document.getElementById('event-list');
    if (!eventList) return;
    eventList.innerHTML = '';

    eventsToShow.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Category: ${event.category}</p>
            <p>${event.description}</p>
            <button id="addToCalendarButton">Add to Calendar</button>
        `;
        eventCard.addEventListener('click', () => {
            const url = `EventDetails.html?title=${encodeURIComponent(event.title)}&date=${encodeURIComponent(event.date)}&time=${encodeURIComponent(event.time)}&location=${encodeURIComponent(event.location || '')}`;
            window.location.href = url;
        });
        eventList.appendChild(eventCard);
    });
}
// Add to Outlook Calendar
function setupAddToCalendarButton(eventDetails) {
    const addToCalendarButton = document.getElementById('addToCalendarButton');
    if (!addToCalendarButton) return;

    addToCalendarButton.addEventListener('click', () => {
        const icsContent = createICSFile(eventDetails);
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'event.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('Event .ics file has been downloaded. You can now import this into your calendar application.');
    });
}

// Function to create the .ics file content
function createICSFile(eventDetails) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startDate = formatDate(eventDetails.startDate);
    const endDate = formatDate(eventDetails.endDate);

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
    navigator.clipboard.writeText(link)
        .then(() => {
            alert('Event link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// This function finds events that match what the user searched for
function searchEvents(query) {
    query = query.toLowerCase();
    return events.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        (event.category && event.category.toLowerCase().includes(query))
    );
}

// This function finds events in a specific category
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
        e.preventDefault();
        const categoryName = category.querySelector('p').textContent;
        window.location.href = `EventsByCategory.html?category=${categoryName}`;
    });
});

// Make the calendar days change color when you hover over them
const days = document.querySelectorAll('.day');
days.forEach(day => {
    day.addEventListener('mouseover', () => {
        day.style.backgroundColor = '#ddd';
    });
    day.addEventListener('mouseout', () => {
        day.style.backgroundColor = '#eee';
    });
});

// Add event listener to the login form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@uark\.edu$/;
    const errorMessageElement = document.getElementById('error-message');

    if (!emailPattern.test(email)) {
        errorMessageElement.textContent = 'Invalid credentials. Please use a UARK email address (e.g., @uark.edu).';
        errorMessageElement.style.display = 'block';
    } else if (password === "") {
        errorMessageElement.textContent = 'Password cannot be empty.';
        errorMessageElement.style.display = 'block';
    } else {
        errorMessageElement.style.display = 'none';
        alert('Login successful!');
    }
});
