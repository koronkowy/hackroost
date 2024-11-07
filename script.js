const pastelColors = [
    '#FFD1DC', '#FFC3A0', '#FFCC99', '#FFF4E0', '#E0BBE4',
    '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3', '#B5EAD7'
];

const jewelTones = [
    '#5C47E0', '#7F27C5', '#C88AFA', '#AF2294', '#DB4D8E',
    '#38D4A4', '#3B2E4C', '#4B3A5A', '#5A4970', '#6A5683', '#7A658E'
];

document.addEventListener("DOMContentLoaded", function () {
    loadChannels();
    setupThemeSelector();
    setupSearch();
});

function loadChannels() {
    fetch("channels.json")
        .then(response => response.json())
        .then(channels => {
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
    const greyValue = Math.floor(Math.random() * 155) + 100; // Lighter shades of grey
    return `rgb(${greyValue}, ${greyValue}, ${greyValue})`;
}

function applyListStyles() {
    const theme = document.body.getAttribute("data-theme");
    const listItems = document.querySelectorAll("#channelList li");

    listItems.forEach(item => {
        if (theme === 'hacker') {
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
        } else if (theme === 'brat') {
            item.style.backgroundColor = '#A4D600';
            item.style.color = '#000000';
            item.style.border = '1px solid #000000';
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

    // Set specific background color for Brat theme
    if (theme === 'brat') {
        document.body.style.background = '#A4D600';
    } else {
        // Reset background for other themes
        document.body.style.background = '';
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
