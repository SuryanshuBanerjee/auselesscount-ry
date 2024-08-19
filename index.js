console.log('A Suryanshu Banerjee Production 💙');
console.log("Hi Rumi");

const decrasebutton = document.getElementById('decrasebutton');
const increasebutton = document.getElementById('increasebutton');
const resetbutton = document.getElementById('resetbutton');
const labelcount = document.getElementById('CountLabel');
const timerDisplay = document.getElementById('timer');
const targetDisplay = document.getElementById('target');
const statusDisplay = document.getElementById('status');

let count = 0;
let targetCount = 10;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let isPositiveTarget = true;
let gameNumber = 0;

function updateDisplay() {
    labelcount.textContent = count;
    targetDisplay.textContent = `Target: ${isPositiveTarget ? targetCount : -targetCount}`;
    // Ensure timeLeft is non-negative
    timerDisplay.textContent = `Time: ${Math.max(0, Math.floor(timeLeft / 60)).toString().padStart(2, '0')}:${Math.max(0, (timeLeft % 60)).toString().padStart(2, '0')}`;
}

function startGame() {
    targetCount = Math.floor(10 * Math.pow(1.5, gameNumber));
    timeLeft = Math.floor(Math.max(10, 30 * Math.pow(0.7, gameNumber)));
    isPositiveTarget = !isPositiveTarget;

    gameNumber++;

    updateDisplay();
    statusDisplay.textContent = 'Status: Playing';

    if (gameInterval) clearInterval(gameInterval);
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            statusDisplay.textContent = (isPositiveTarget ? count >= targetCount : count <= -targetCount) ? 'Status: You Win!' : 'Status: You Lose!';
            setTimeout(startGame, 3000);
        }
    }, 1000);
}

decrasebutton.onclick = () => {
    if (statusDisplay.textContent.includes('Playing')) {
        count--;
        updateDisplay();
        if (count <= -targetCount && !isPositiveTarget) {
            statusDisplay.textContent = 'Status: You Win!';
            clearInterval(timerInterval);
            setTimeout(startGame, 3000);
        }
    }
}

increasebutton.onclick = () => {
    if (statusDisplay.textContent.includes('Playing')) {
        count++;
        updateDisplay();
        if (count >= targetCount && isPositiveTarget) {
            statusDisplay.textContent = 'Status: You Win!';
            clearInterval(timerInterval);
            setTimeout(startGame, 3000);
        }
    }
}

resetbutton.onclick = () => {
    startGame();
}

startGame();
