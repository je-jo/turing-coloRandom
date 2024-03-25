// variables

var boxes = document.querySelectorAll(".box");
var btnNew = document.querySelector(".btn-new");
var btnSave = document.querySelector(".btn-save");
var containerCurrentPalette = document.querySelector(".palette-current");
var containerSavedPalettes = document.querySelector(".container-saved-palettes");
var paraSavedPalettes = document.querySelector(".para-saved-palettes");

// local storage

function saveCurrent() {
    localStorage.setItem("currentPalette", JSON.stringify(currentPalette))
}

function savePalettesLocally() {
    localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes));
}


if (!localStorage.getItem("savedPalettes")) {
    var currentPalette = initiatePalette();
    var savedPalettes = [];
} else {
    currentPalette = JSON.parse(localStorage.getItem("currentPalette"));
    savedPalettes = JSON.parse(localStorage.getItem("savedPalettes"));
    renderSavedPalettes();
}

// helper functions

function initiatePalette() {
    var palette = [];
    for (var i = 0; i < 5; i++) {
        let color = {
            color: generateRandomHexCode(),
            isLocked: false
        }
        palette.push(color);
    }
    return palette;
}

function getRandomChar(string) {
    var randomIndex = Math.floor(Math.random() * string.length);
    return string.charAt(randomIndex);
}

function generateRandomHexCode() {
    var hexCode = "#";
    var hexCharacters = "ABCDEF0123456789";
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
    saveCurrent();
    return currentPalette;
}

function toggleLock(e) {
    if (e.target.type === "button") {
        var indexToChange = [...containerCurrentPalette.children].indexOf(e.target.parentNode);
        currentPalette[indexToChange].isLocked = !currentPalette[indexToChange].isLocked;
        renderCurrentLockStatus(indexToChange);
    }
    saveCurrent();
}

function savePalette() {
    var paletteToSave = [];
    for (var i = 0; i < currentPalette.length; i++) {
        paletteToSave.push({ color: currentPalette[i].color });
    }
    savedPalettes.push(paletteToSave);
    savePalettesLocally();
    renderSavedPalettes();
    generateRandomPalette();
    renderCurrentPalette();
};

// Update DOM functions

function renderCurrentPalette() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = currentPalette[i].color;
        boxes[i].children[1].textContent = currentPalette[i].color;
        renderCurrentLockStatus(i);
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

function getIndexToRemove(e) {
    if (e.target.classList.contains("btn-delete")) {
        var nodeToRemove = e.target.parentNode.parentNode.parentNode
        var indexToRemove = [...containerSavedPalettes.children].indexOf(nodeToRemove)
        savedPalettes.splice(indexToRemove, 1);
        savePalettesLocally();
        removePalette(nodeToRemove);
    }
}

function removePalette(node) {
    containerSavedPalettes.removeChild(node);
    renderSavedPalettes();
}

// Event listeners

containerCurrentPalette.addEventListener("click", toggleLock);

btnNew.addEventListener("click", function () {
    generateRandomPalette();
    renderCurrentPalette();
});

btnSave.addEventListener("click", savePalette);

containerSavedPalettes.addEventListener("click", getIndexToRemove);

window.addEventListener("load", function () {
    generateRandomPalette();
    renderCurrentPalette();
});



