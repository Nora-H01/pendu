// menu.js
document.getElementById('startButton').addEventListener('click', () => {
    window.location.href = 'game.html'; // Redirige vers la page du jeu
});

document.getElementById('rulesButton').addEventListener('click', () => {
    const rules = document.getElementById('rules');
    if (rules.style.display === 'none') {
        rules.style.display = 'block';
    } else {
        rules.style.display = 'none';
    }
});
