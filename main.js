const generateBtn = document.getElementById('generate-btn');
const numbersDisplay = document.getElementById('numbers-display');

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