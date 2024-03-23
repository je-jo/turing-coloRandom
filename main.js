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
var savedPalettes = [];

var boxes = document.querySelectorAll(".box");
var btnNew = document.querySelector(".btn-new");
var btnSave = document.querySelector(".btn-save");
var containerCurrentPalette = document.querySelector(".palette-current");
var containerSavedPalettes = document.querySelector(".container-saved-palettes");
var paraSavedPalettes = document.querySelector(".para-saved-palettes")


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
    };
    return currentPalette;
}

function toggleLock(e) {
    if (e.target.type === "button") {
        var indexToChange = [...containerCurrentPalette.children].indexOf(e.target.parentNode);
        currentPalette[indexToChange].isLocked = !currentPalette[indexToChange].isLocked;
        renderCurrentLockStatus(indexToChange);
    }
}

function savePalette() {
    var paletteToSave = [];
    for (var i = 0; i < currentPalette.length; i++) {
        paletteToSave.push({ color: currentPalette[i].color });
    }
    savedPalettes.push(paletteToSave);
    renderSavedPalettes();
    generateRandomPalette();
    renderCurrentPalette();
};

// Update DOM functions

function renderCurrentPalette() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = currentPalette[i].color;
        boxes[i].children[1].textContent = currentPalette[i].color;
    }
}

function renderSavedPalettes() {
    if (!savedPalettes.length) {
        paraSavedPalettes.classList.remove("hidden");
    } else {
        paraSavedPalettes.classList.add("hidden");
        containerSavedPalettes.textContent = "";
        for (var i = 0; i < savedPalettes.length; i++) {
            var savedPaletteListItem = document.createElement("li");
            var savedPalette = document.createElement("ul");
            savedPalette.classList.add("saved-palette");
            for (var j = 0; j < savedPalettes[i].length; j++) {
                var savedPaletteColor = document.createElement("li");
                savedPaletteColor.classList.add("mini-box");
                savedPaletteColor.style.backgroundColor = savedPalettes[i][j].color;
                savedPalette.appendChild(savedPaletteColor);
            }
            var savedPaletteBtnLi = document.createElement("li")
            var btnDelete = document.createElement("button");
            btnDelete.classList.add("btn-delete");
            savedPaletteBtnLi.appendChild(btnDelete);
            savedPalette.appendChild(savedPaletteBtnLi);
            savedPaletteListItem.appendChild(savedPalette);
            containerSavedPalettes.appendChild(savedPaletteListItem);
        }
    }  
}

function renderCurrentLockStatus(index) {
    if (currentPalette[index].isLocked) {
        boxes[index].children[0].style.backgroundImage = 'url("assets/locked.png")';
    } else {
        boxes[index].children[0].style.backgroundImage = 'url("assets/unlocked.png")';
    }
}

// Event listeners

containerCurrentPalette.addEventListener("click", toggleLock);

btnNew.addEventListener("click", function () {
    generateRandomPalette();
    renderCurrentPalette();
});

btnSave.addEventListener("click", savePalette);

window.addEventListener("load", function () {
    generateRandomPalette();
    renderCurrentPalette();
});


