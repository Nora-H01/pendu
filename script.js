let word; 
let guessedLetters = []; 
let remainingGuesses = 13; 
let points = 0; 
let timer; 
let timeLeft = 180; //temps restant
let hintGiven = false; 

const images = [
    "image0", "image1", "image2", "image3", "image4", "image5",
    "image6", "image7", "image8", "image9", "image10", "image11", "image12"
];

function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function startGame() {
    word = getRandomWord();
    guessedLetters = []; 
    remainingGuesses = 13; 
    hintGiven = false; 
    if (points === 0) {
        timeLeft = 180; 
    }
    resetImages(); 
    updateDisplay(); 
    startTimer();
}

function startTimer() {
    clearInterval(timer); // Nettoyer minuteur 
    timer = setInterval(() => {
        timeLeft--; // Décrémenter le temps restant
        updateTimeDisplay();
        if (timeLeft <= 0) { 
            clearInterval(timer); 
            displayMessage(`Temps écoulé! Votre score final est: ${points}`, 'red');
            resetGame(); 
        }
    }, 1000); 
}

function stopTimer() {
    clearInterval(timer); // Arrêter minuteur
}

function resetTimer() {
    timeLeft = 180; // Réinitialiser le temps à 2 minutes
    updateTimeDisplay(); 
}

function reduceTime() {
    timeLeft = Math.max(30, timeLeft - 15); // Réduire le temps -> au moins 30 secondes
    updateTimeDisplay(); 
}

function updateDisplay() {
    let displayWord = word.split('').map(letter => guessedLetters.includes(letter) ? `<span class="correct">${letter}</span>` : `<span class="blank">_</span>`).join(' ');

    let guessedLettersDisplay = guessedLetters.map(letter => word.includes(letter) ? `<span class="correct">${letter}</span>` : `<span class="incorrect">${letter}</span>`).join(", ");

    document.getElementById('wordDisplay').innerHTML = `Mot: ${displayWord}`;
    document.getElementById('guessesLeft').innerText = `Tentatives restantes: ${remainingGuesses}`;
    document.getElementById('guessedLetters').innerHTML = `Lettres devinées: ${guessedLettersDisplay}`;
    document.getElementById('scoreDisplay').innerText = `Points: ${points}`;

    if (remainingGuesses === 2 && !hintGiven) {
        provideHint();
    }
}

function updateTimeDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('timeDisplay').innerText = `Temps restant: ${minutes}m ${seconds}s`;
}

function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) { // Si la lettre n'a pas déjà été devinée
        guessedLetters.push(letter);  
        if (!word.includes(letter)) { 
            remainingGuesses--; // Réduire les tentatives restantes
            updateHangmanImage(); 
        }
    }
    checkGameOver(); // Vérifier si le jeu est terminé
    updateDisplay(); 
}

function updateHangmanImage() {
    const imageIndex = 13 - remainingGuesses - 1; // Calculer l'index de l'image
    if (imageIndex >= 0 && imageIndex < images.length) {
        document.getElementById(images[imageIndex]).style.display = 'block'; 
    }
}

function resetImages() {
    images.forEach(imageId => {
        document.getElementById(imageId).style.display = 'none'; 
    });
}

function checkGameOver() {
    if (remainingGuesses <= 0) { // Si les tentatives sont épuisées
        stopTimer(); 
        displayMessage(`Perdu ! Le mot était : ${word}. Votre score est : ${points}`, 'red');
        resetGame(); 
    } else if (word.split('').every(letter => guessedLetters.includes(letter))) {  
        points++; // Augmenter les points
        displayMessage(`Gagné ! Le mot était : ${word}.`, 'green');
        reduceTime(); 
        setTimeout(startGame, 2000); 
    }
}

function resetGame() {
    stopTimer(); 
    guessedLetters = [];
    remainingGuesses = 13;
    points = 0; 
    hintGiven = false; 
    startGame(); 
}

function provideHint() {
    const unguessedLetters = word.split('').filter(letter => !guessedLetters.includes(letter)); 
    if (unguessedLetters.length > 0) {
        const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)]; 
        const displayWord = word.split('').map(letter => (guessedLetters.includes(letter) ? letter : "_")).join(' ');
        document.getElementById('wordDisplay').innerHTML += ` <span class="indice">(${hintLetter})</span>`; 
        hintGiven = true; 
    }
}

function displayMessage(message, color) {
    const messageElement = document.getElementById('messageDisplay');
    messageElement.innerText = message;
    messageElement.style.color = color;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'z' || event.key === 'Z') {
        event.preventDefault();
    }
    
    if (event.key.match(/^[a-z]$/i)) { 
        guessLetter(event.key.toLowerCase()); 
    } else if (event.key === 'Escape') { 
        window.location.href = 'index.html'; 
    }
});

startGame();