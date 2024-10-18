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
            <div class="social-share">
                <a href="#" class="share-facebook">Share on Facebook</a>
                <a href="#" class="share-x">Share on X</a>
                <a href="#" class="share-whatsapp">Share on WhatsApp</a>
            </div>
        `;
        // Add the card to the page
        eventList.appendChild(eventCard);

        // Add event listeners for the share buttons
        const shareFacebookBtn = eventCard.querySelector('.share-facebook');
        const shareXBtn = eventCard.querySelector('.share-x');
        const shareWhatsappBtn = eventCard.querySelector('.share-whatsapp');

        shareFacebookBtn.addEventListener('click', () => {
            shareEvent('facebook', event);
        });

        shareXBtn.addEventListener('click', () => {
            shareEvent('x', event);
        });

        shareWhatsappBtn.addEventListener('click', () => {
            shareEvent('whatsapp', event);
        });
    });
}

// This function creates the social media share link
function shareEvent(platform, event) {
    let url = encodeURIComponent(window.location.href);
    let text = encodeURIComponent(`${event.title} - ${event.description}`);

    switch (platform) {
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
            break;
        case 'x':
            url = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'whatsapp':
            url = `https://wa.me/?text=${text}%20${url}`;
            break;
    }

    window.open(url, '_blank');
}

// ... (rest of your code)