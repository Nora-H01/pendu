// timer.js

export let timeLeft = 120; // Temps initial en secondes (2 minutes)
const minTime = 30; // Temps minimum en secondes
const timeReduction = 15; // Réduction de temps en secondes
let timer;

// Fonction pour démarrer le minuteur
export function startTimer(callback) {
    clearInterval(timer); // Nettoyer tout minuteur existant
    timer = setInterval(() => {
        timeLeft--; // Décrémenter le temps restant
        updateTimeDisplay(); // Mettre à jour l'affichage du temps
        if (timeLeft <= 0) { // Si le temps est écoulé
            clearInterval(timer); // Arrêter le minuteur
            callback(); // Appeler la fonction de rappel (ex: fin du jeu)
        }
    }, 1000); // Répéter toutes les secondes
}

// Fonction pour arrêter le minuteur
export function stopTimer() {
    clearInterval(timer); // Arrêter le minuteur
}

// Fonction pour réinitialiser le minuteur
export function resetTimer() {
    timeLeft = 120; // Réinitialiser le temps à 2 minutes
    updateTimeDisplay(); // Mettre à jour l'affichage du temps
}

// Fonction pour réduire le temps restant
export function reduceTime() {
    timeLeft = Math.max(minTime, timeLeft - timeReduction); // Réduire le temps mais s'assurer qu'il reste au moins minTime secondes
    updateTimeDisplay(); // Mettre à jour l'affichage du temps
}

// Fonction pour mettre à jour l'affichage du temps
function updateTimeDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('timeDisplay').innerText = `Temps restant: ${minutes}m ${seconds}s`;
}
