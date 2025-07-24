let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function updateDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
    millisecondsEl.textContent = milliseconds.toString().padStart(2, '0');
}

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
    }
}

function pauseStopwatch() {
    if (running) {
        running = false;
        clearInterval(timerInterval);
    }
}

function resetStopwatch() {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(0);
    lapList.innerHTML = '';
}

function recordLap() {
    if (running) {
        const li = document.createElement('li');
        li.textContent = `${minutesEl.textContent}:${secondsEl.textContent}.${millisecondsEl.textContent}`;
        lapList.appendChild(li);
        lapList.scrollTop = lapList.scrollHeight;
    }
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Initialize display
updateDisplay(0); 