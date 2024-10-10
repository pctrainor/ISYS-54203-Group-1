const days = document.querySelectorAll('.day');

days.forEach(day => {
    day.addEventListener('mouseover', () => {
        day.style.backgroundColor = '#ddd';
    });

    day.addEventListener('mouseout', () => {
        day.style.backgroundColor = '#eee';
    });
});