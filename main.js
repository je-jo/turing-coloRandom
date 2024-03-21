// variables

var hexCharacters = "ABCDEF0123456789";
var currentPalette = [
    {
        color: null,
        isLocked: false
    },
    {
        color: null,
        isLocked: false
    },
    {
        color: null,
        isLocked: false
    },
    {
        color: null,
        isLocked: false
    },
    {
        color: null,
        isLocked: false
    }
];

var boxes = document.querySelectorAll(".box");
var btnNew = document.querySelector(".btn-new");
var containerCurrentPalette = document.querySelector(".palette-current");


// helper functions

function getRandomChar(string) {
    var randomIndex = Math.floor(Math.random() * string.length);
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
    for (var i = 0; i < currentPalette.length; i++) {
        if (!currentPalette[i].isLocked) {
            currentPalette[i].color = generateRandomHexCode();
        }
    }
    return currentPalette;
}

function toggleLock(e) {
    if (e.target.type === "button") {
        var indexToChange = [...containerCurrentPalette.children].indexOf(e.target.parentNode);
        currentPalette[indexToChange].isLocked = !currentPalette[indexToChange].isLocked;
        renderCurrentLockStatus(indexToChange);
    }
}

// Update DOM functions

function renderCurrentPallete() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = currentPalette[i].color;
        boxes[i].children[1].textContent = currentPalette[i].color;
    }
}

function renderCurrentLockStatus(index) {
    if (currentPalette[index].isLocked) {
        boxes[index].children[0].style.backgroundImage = 'url("/assets/locked.png")';
    } else {
        boxes[index].children[0].style.backgroundImage = 'url("/assets/unlocked.png")';
    }

}

// Event listeners

containerCurrentPalette.addEventListener("click", toggleLock);

btnNew.addEventListener("click", function () {
    generateRandomPalette();
    renderCurrentPallete();
});

window.addEventListener("load", function () {
    generateRandomPalette();
    renderCurrentPallete();
});


