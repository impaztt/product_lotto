document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.querySelector('.numbers-container');
    const generateBtn = document.getElementById('generate-btn');

    generateBtn.addEventListener('click', () => {
        generateAndDisplayNumbers();
    });

    function generateAndDisplayNumbers() {
        const numbers = generateUniqueNumbers(6, 1, 45);
        displayNumbers(numbers);
    }

    function generateUniqueNumbers(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }

    function displayNumbers(numbers) {
        numbersContainer.innerHTML = '';
        numbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.textContent = number;
            numbersContainer.appendChild(numberElement);
        });
    }
});
