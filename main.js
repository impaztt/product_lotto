document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.querySelector('.numbers-container');
    const generateBtn = document.getElementById('generate-btn');
    const drawCountSelect = document.getElementById('draw-count');

    generateBtn.addEventListener('click', () => {
        generateAndDisplayNumbers();
    });

    function generateAndDisplayNumbers() {
        const drawCount = parseInt(drawCountSelect.value, 10);
        const draws = [];
        for (let i = 0; i < drawCount; i += 1) {
            const numbers = generateUniqueNumbers(6, 1, 45).sort((a, b) => a - b);
            draws.push(numbers);
        }
        displayNumbers(draws);
    }

    function generateUniqueNumbers(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }

    function displayNumbers(draws) {
        numbersContainer.innerHTML = '';
        draws.forEach((numbers, index) => {
            const row = document.createElement('div');
            row.classList.add('number-row');

            const label = document.createElement('div');
            label.classList.add('row-label');
            label.textContent = `Set ${index + 1}`;
            row.appendChild(label);

            numbers.forEach(number => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = number;
                row.appendChild(numberElement);
            });

            numbersContainer.appendChild(row);
        });
    }
});
