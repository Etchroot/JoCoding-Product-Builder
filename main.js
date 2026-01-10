const generateBtn = document.getElementById('generate-btn');
const numbersDisplay = document.getElementById('numbers-display');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// Theme switching logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.dataset.theme = currentTheme;
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.body.dataset.theme;
    if (theme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    } else {
        document.body.dataset.theme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
});


generateBtn.addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    numbersDisplay.innerHTML = '';
    for (const number of [...numbers].sort((a, b) => a - b)) {
        const numberBall = document.createElement('div');
        numberBall.classList.add('number-ball');
        numberBall.textContent = number;
        numbersDisplay.appendChild(numberBall);
    }
});