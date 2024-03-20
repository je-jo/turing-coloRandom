// variables

var hexCharacters = "ABCDEF0123456789";
var currentPalette = [];

var boxes = document.querySelectorAll(".box");
var btnNew = document.querySelector(".btn-new");

// helper functions

function getRandomChar(string) {
    var randomIndex =  Math.floor(Math.random() * string.length);
    return string.charAt(randomIndex);
}

function generateRandomHexCode() {
    var hexCode = "#";
    for (var i = 0; i < 6; i++) {
        hexCode += getRandomChar(hexCharacters);
    }
    return hexCode;
}

// main functions

function generateRandomPalette() {
    currentPalette = [];
    for (var i = 0; i < 5; i++) {
        currentPalette.push(generateRandomHexCode());
    }
    return currentPalette;
}

// Update DOM functions

function renderCurrentPallete() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = currentPalette[i];
        boxes[i].nextElementSibling.textContent = currentPalette[i];
    }
}

// Event listeners

btnNew.addEventListener("click", function() {
    generateRandomPalette();
    renderCurrentPallete();
});

window.addEventListener("load", function() {
    generateRandomPalette();
    renderCurrentPallete();
});


