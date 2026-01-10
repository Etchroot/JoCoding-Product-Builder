document.addEventListener('DOMContentLoaded', () => {
    const historyTableBody = document.querySelector('#history-table tbody');
    const checkForm = document.getElementById('check-form');
    const checkResultDiv = document.getElementById('check-result');
    let lottoHistoryData = [];

    // Fetches lotto history data and populates the table
    async function loadHistory() {
        try {
            const response = await fetch('lotto-history.json');
            if (!response.ok) {
                throw new Error('Could not fetch lotto history data.');
            }
            lottoHistoryData = await response.json();
            
            historyTableBody.innerHTML = ''; // Clear existing rows

            lottoHistoryData.forEach(record => {
                const row = document.createElement('tr');

                const roundCell = document.createElement('td');
                roundCell.textContent = record.round;
                row.appendChild(roundCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = record.date;
                row.appendChild(dateCell);

                const numbersCell = document.createElement('td');
                const numbersContainer = document.createElement('div');
                numbersContainer.classList.add('numbers-container-small');
                
                record.numbers.forEach(num => {
                    const numberBall = document.createElement('div');
                    numberBall.classList.add('number-ball-small');
                    numberBall.textContent = num;
                    numbersContainer.appendChild(numberBall);
                });

                numbersCell.appendChild(numbersContainer);
                row.appendChild(numbersCell);
                historyTableBody.appendChild(row);
            });

        } catch (error) {
            console.error(error);
            historyTableBody.innerHTML = `<tr><td colspan="3">데이터를 불러오는 데 실패했습니다.</td></tr>`;
        }
    }

    // Handles the number check form submission
    checkForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputs = Array.from(checkForm.querySelectorAll('input'));
        const userNumbers = inputs.map(input => parseInt(input.value, 10)).sort((a, b) => a - b);

        // Basic validation
        if (userNumbers.some(isNaN)) {
            checkResultDiv.textContent = '모든 칸에 숫자를 입력해주세요.';
            checkResultDiv.className = 'result-fail';
            return;
        }
        const uniqueUserNumbers = new Set(userNumbers);
        if (uniqueUserNumbers.size !== 6) {
            checkResultDiv.textContent = '중복되지 않는 6개의 숫자를 입력해야 합니다.';
             checkResultDiv.className = 'result-fail';
            return;
        }

        let matchFound = false;
        for (const record of lottoHistoryData) {
            const historicalNumbers = [...record.numbers].sort((a, b) => a - b);
            if (JSON.stringify(userNumbers) === JSON.stringify(historicalNumbers)) {
                checkResultDiv.innerHTML = `<strong>축하합니다!</strong> 이 번호 조합은 <strong>${record.date}</strong> (${record.round}회차)에 당첨되었습니다.`;
                checkResultDiv.className = 'result-success';
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            checkResultDiv.textContent = '아쉽지만, 입력하신 번호는 과거 당첨 기록에 없습니다.';
            checkResultDiv.className = 'result-fail';
        }
    });

    // Initial load
    loadHistory();
});
