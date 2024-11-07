const pastelColors = [
    '#FFD1DC', '#FFC3A0', '#FFCC99', '#FFF4E0', '#E0BBE4',
    '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3', '#B5EAD7'
];

document.addEventListener("DOMContentLoaded", function() {
    populateRawList();
    styleListItems();

    // Theme selection functionality
    const themeSelector = document.getElementById('themeSelector');
    themeSelector.addEventListener('change', function() {
        changeTheme(this.value);
        styleListItems(); // Reapply styles based on the selected theme
    });

    // Search bar functionality
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', filterChannels);
});

// Function to get a random pastel color
function getRandomPastelColor() {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
}

// Function to determine if the color is light (for text contrast)
function isLight(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}

// Function to populate the raw list textarea with all channel names and URLs
function populateRawList() {
    const listItems = document.querySelectorAll('li a');
    const rawList = Array.from(listItems).map(item => `${item.textContent} (${item.href})`).join('\n');
    document.getElementById('rawList').textContent = rawList;
}

// Function to copy the raw list content to clipboard
function copyList() {
    const textarea = document.getElementById('rawList');
    textarea.select();
    document.execCommand('copy');
    alert('Channel list copied to clipboard!');
}

// Function to change the theme based on selection
function changeTheme(theme) {
    document.body.className = ''; // Clear previous theme
    document.body.classList.add(theme); // Apply new theme
}

// Function to style list items with random pastel colors, but skip if in Hacker mode
function styleListItems() {
    const listItems = document.querySelectorAll('li');

    // Apply pastel colors only if not in Hacker mode
    if (!document.body.classList.contains('hacker')) {
        listItems.forEach(item => {
            const randomColor = getRandomPastelColor();
            item.style.backgroundColor = randomColor;
            item.style.color = isLight(randomColor) ? 'black' : 'white';
            item.style.border = 'none'; // Remove border in non-Hacker modes
        });
    } else {
        // In Hacker mode, set plain black background with green text and border
        listItems.forEach(item => {
            item.style.backgroundColor = '#000000';
            item.style.color = '#00ff00';
            item.style.border = '1px solid #00ff00'; // Add green border
        });
    }
}

// Function to filter channel list based on search input
function filterChannels(event) {
    const query = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
    });
}
