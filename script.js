const pastelColors = [
    '#FFD1DC', '#FFC3A0', '#FFCC99', '#FFF4E0', '#E0BBE4',
    '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3', '#B5EAD7'
];

document.addEventListener("DOMContentLoaded", function() {
    populateRawList();
    styleListItems();

    const themeSelector = document.getElementById('themeSelector');
    themeSelector.addEventListener('change', function() {
        changeTheme(this.value);
    });
});

function getRandomPastelColor() {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
}

function isLight(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}

function populateRawList() {
    const listItems = document.querySelectorAll('li a');
    const rawList = Array.from(listItems).map(item => `${item.textContent} (${item.href})`).join('\n');
    document.getElementById('rawList').textContent = rawList;
}

function copyList() {
    const textarea = document.getElementById('rawList');
    textarea.select();
    document.execCommand('copy');
}

function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
}

function styleListItems() {
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        const randomColor = getRandomPastelColor();
        item.style.backgroundColor = randomColor;
        // Ensure text is visible against background by adjusting the color
        item.style.color = isLight(randomColor) ? 'black' : 'white';
    });
}
