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

const twitterShareBtn = document.getElementById('twitter-share-btn');
const facebookShareBtn = document.getElementById('facebook-share-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');

twitterShareBtn.addEventListener('click', () => {
    const url = window.location.href;
    const text = '로또 번호 생성기로 행운의 번호를 받아보세요!';
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
});

facebookShareBtn.addEventListener('click', () => {
    const url = window.location.href;
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
});

copyLinkBtn.addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('링크가 복사되었습니다!');
    }, () => {
        alert('링크 복사에 실패했습니다.');
    });
});