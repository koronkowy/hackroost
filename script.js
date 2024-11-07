const pastelColors = [
    '#FFD1DC', '#FFC3A0', '#FFCC99', '#FFF4E0', '#E0BBE4',
    '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3', '#B5EAD7'
];

const jewelTones = [
    '#A05DA5', // Purple
    '#5E93A1', // Teal Blue
    '#9073A3', // Muted Lavender
    '#3C4C79', // Deep Blue
    '#2A1E3C'  // Dark Purple
];

const bratGreen = '#8ACE00'; // Consistent brat green

document.addEventListener("DOMContentLoaded", function () {
    loadChannels();
    setupThemeSelector();
    setupSearch();
});

function loadChannels() {
    fetch("channels.json")
        .then(response => response.json())
        .then(channels => {
            // Sort channels alphabetically by name
            channels.sort((a, b) => a.name.localeCompare(b.name));

            const channelList = document.getElementById("channelList");
            channelList.innerHTML = "";

            channels.forEach(channel => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = channel.url;
                link.textContent = channel.name;
                listItem.appendChild(link);
                channelList.appendChild(listItem);
            });

            populateRawList();
            applyListStyles();
        })
        .catch(error => console.error("Error loading channels:", error));
}

function setupThemeSelector() {
    const themeSelector = document.getElementById("themeSelector");
    themeSelector.addEventListener("change", function () {
        changeTheme(this.value);
        applyListStyles();
    });
}

function setupSearch() {
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const channels = document.querySelectorAll("#channelList li");

        channels.forEach(channel => {
            const text = channel.textContent.toLowerCase();
            channel.style.display = text.includes(searchTerm) ? "" : "none";
        });
    });
}

function populateRawList() {
    const listItems = document.querySelectorAll("#channelList li a");
    const rawList = Array.from(listItems).map(item => `${item.textContent} (${item.href})`).join("\n");
    document.getElementById("rawList").textContent = rawList;
}

function copyList() {
    const textarea = document.getElementById("rawList");
    textarea.select();
    document.execCommand("copy");
}

function getRandomPastelColor() {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
}

function getRandomJewelTone() {
    const randomIndex = Math.floor(Math.random() * jewelTones.length);
    return jewelTones[randomIndex];
}

function getRandomGreyShade() {
    const greyValue = Math.floor(Math.random() * 155) + 100;
    return `rgb(${greyValue}, ${greyValue}, ${greyValue})`;
}

function applyListStyles() {
    const theme = document.body.getAttribute("data-theme");
    const listItems = document.querySelectorAll("#channelList li");

    listItems.forEach(item => {
        if (theme === 'brat') {
            item.style.backgroundColor = bratGreen;
            item.style.color = 'black';
            item.style.border = '1px solid black';
        } else if (theme === 'hacker') {
            item.style.backgroundColor = '#000000';
            item.style.color = '#00ff00';
            item.style.border = '1px solid #00ff00';
        } else if (theme === 'greyscale') {
            item.style.backgroundColor = getRandomGreyShade();
            item.style.color = '#333';
            item.style.border = 'none';
        } else if (theme === 'dark') {
            const randomJewelColor = getRandomJewelTone();
            item.style.backgroundColor = randomJewelColor;
            item.style.color = '#e6e6e6';
            item.style.border = 'none';
        } else {
            const randomColor = getRandomPastelColor();
            item.style.backgroundColor = randomColor;
            item.style.color = isLight(randomColor) ? "black" : "white";
            item.style.border = 'none';
        }
    });
}

function changeTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    const title = document.querySelector(".title");

    if (theme === 'brat') {
        title.style.fontFamily = 'Arial Narrow, sans-serif';
        title.style.fontWeight = 'bold';
        title.style.color = 'black';
        document.body.style.backgroundColor = bratGreen; // Set solid brat green background
        document.body.style.backgroundImage = 'none'; // Remove any gradients
    } else {
        title.style.fontFamily = "'ADLaM Display', cursive";
        title.style.fontWeight = 'normal';

        if (theme === 'hacker') {
            title.style.color = '#00ff00'; // Cyber green for hacker theme
            document.body.style.backgroundColor = '#000000';
            document.body.style.backgroundImage = 'none';
        } else {
            title.style.color = ''; // Default color
            document.body.style.backgroundImage = ''; // Restore gradient
            document.body.style.backgroundColor = '';
        }
    }

    applyListStyles();
}

function isLight(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}
