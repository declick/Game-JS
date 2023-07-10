// Déclaration des variables globales
var currentLevel = 1; // Niveau actuel
var wordLength = 3; // Longueur du mot à deviner
var wordToGuess = ""; // Mot à deviner
var scrambledLetters = []; // Lettres mélangées
var emptySlots = []; // Emplacements vides pour les lettres
var selectedLetter = ""; // Lettre sélectionnée par le joueur

// Fonction pour initialiser le jeu
function initializeGame() {
    displayLogo();
    displayMenu();
}

// Fonction pour afficher le logo
function displayLogo() {
    var logo = document.getElementById('logo');
    // Code pour afficher le logo
}

// Fonction pour afficher le menu
function displayMenu() {
    var menu = document.getElementById('menu');
    // Code pour afficher le menu
}

// Fonction pour démarrer le jeu
function startGame(level, length) {
    currentLevel = level;
    wordLength = length;
    wordToGuess = selectRandomWord(wordLength);
    scrambledLetters = scrambleWord(wordToGuess);
    emptySlots = createEmptySlots(wordLength);

    displayGameBoard();
}

// Fonction pour sélectionner un mot aléatoire à partir d'une liste
function selectRandomWord(length) {
    var wordList = ["apple", "banana", "car", "dog", "elephant"];
    var filteredList = wordList.filter(word => word.length === length);
    var randomIndex = Math.floor(Math.random() * filteredList.length);
    return filteredList[randomIndex];
}

// Fonction pour mélanger les lettres d'un mot
function scrambleWord(word) {
    var letters = word.split('');
    for (var i = letters.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = letters[i];
        letters[i] = letters[j];
        letters[j] = temp;
    }
    return letters;
}

// Fonction pour créer les emplacements vides pour les lettres
function createEmptySlots(length) {
    var slots = [];
    for (var i = 0; i < length; i++) {
        slots.push('');
    }
    return slots;
}

// Fonction pour afficher le plateau de jeu
function displayGameBoard() {
    var wordContainer = document.getElementById('word-container');
    var letterContainer = document.getElementById('letter-container');

    wordContainer.innerHTML = '';
    letterContainer.innerHTML = '';

    for (var i = 0; i < emptySlots.length; i++) {
        var slot = document.createElement('div');
        slot.className = 'empty-slot';
        wordContainer.appendChild(slot);
    }

    for (var j = 0; j < scrambledLetters.length; j++) {
        var letter = document.createElement('div');
        letter.className = 'scrambled-letter';
        letter.innerText = scrambledLetters[j];
        letter.addEventListener('click', function() {
            selectLetter(this.innerText);
        });
        letterContainer.appendChild(letter);
    }
}

// Fonction appelée lorsque le joueur sélectionne une lettre
function selectLetter(letter) {
    if (selectedLetter === letter) {
        selectedLetter = ""; // Si la lettre est déjà sélectionnée, on la désélectionne
        removeLetterFromSlots(letter);
    } else {
        selectedLetter = letter;
        placeLetterInSlots(letter);
    }
}

// Fonction pour placer une lettre dans les cases vides
function placeLetterInSlots(letter) {
    var slots = document.getElementsByClassName('empty-slot');
    for (var i = 0; i < slots.length; i++) {
        if (slots[i].innerText === '') {
            slots[i].innerText = letter;
            break;
        }
    }
}

// Fonction pour enlever une lettre des cases vides
function removeLetterFromSlots(letter) {
    var slots = document.getElementsByClassName('empty-slot');
    for (var i = slots.length - 1; i >= 0; i--) {
        if (slots[i].innerText === letter) {
            slots[i].innerText = '';
            break;
        }
    }
}

// Fonction pour vérifier si le mot a été correctement deviné
function checkWord() {
    var guessedWord = getWordFromSlots();

    if (guessedWord === wordToGuess) {
        // Le mot a été correctement deviné, effectuer les actions appropriées
    } else {
        // Le mot est incorrect, effectuer les actions appropriées
    }
}

// Fonction pour obtenir le mot actuel à partir des cases vides
function getWordFromSlots() {
    var slots = document.getElementsByClassName('empty-slot');
    var word = '';
    for (var i = 0; i < slots.length; i++) {
        word += slots[i].innerText;
    }
    return word;
}

// Appel à la fonction pour initialiser le jeu
initializeGame();
