// Number Guessing Game — Core App

// Settings (use const for values that do not change)
const MIN = 1;
const MAX = 100;
const MAX_ATTEMPTS = 10;

// Cache DOM elements once (efficient and readable)
const elGuess = document.querySelector('#guess');
const elSubmit = document.querySelector('#submit');
const elReset = document.querySelector('#reset');
const elStatus = document.querySelector('#status');
const elAttempts = document.querySelector('#attempts');
const elHearts = document.querySelector('#hearts');
const elRange = document.querySelector('#range');

// Game state (use let for values that change)
let secret = makeSecret(MIN, MAX);
let attempts = 0;
let gameOver = false;

// Initial UI
elRange.textContent = `I picked a number between ${MIN} and ${MAX}.`;
renderAttempts();
setStatus('Make your first guess!', 'ok');
elGuess.focus();

// Event listeners (event-driven behavior)
elSubmit.addEventListener('click', handleGuess);
elReset.addEventListener('click', resetGame);
elGuess.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleGuess();
});

// Handle a guess: validation, comparison, and feedback
function handleGuess() {
  if (gameOver) return;

  const raw = elGuess.value;   // strings come from inputs
  if (!raw.trim()) {
    setStatus('Please enter a value.', 'warn');
    return;
  }

  const num = Number(raw);     // convert to number
  if (Number.isNaN(num)) {
    setStatus('That is not a number.', 'err');
    return;
  }

  if (num < MIN || num > MAX) {
    setStatus(`Enter a number between ${MIN} and ${MAX}.`, 'warn');
    return;
  }

  // Valid guess: count it
  attempts++;

  // Compare using strict equality and relational operators
  if (num === secret) {
    setStatus(`You got it in ${attempts} ${pluralize('try', attempts)}!`, 'ok');
    gameOver = true;
    return;
  } else if (num < secret) {
    setStatus('Too low. Try a larger number.', 'warn');
  } else {
    setStatus('Too high. Try a smaller number.', 'warn');
  }

  // Added feedback for >5 attempts

  if (attempts >= 5) {
    if (Math.abs(num - secret) <= 10) {
      setStatus(`Hint: within 10 `, 'warn');
    }
  }



  renderAttempts();

  // Check end condition (max attempts)
  if (!gameOver && attempts >= MAX_ATTEMPTS) {
    setStatus(`Out of tries. The number was ${secret}.`, 'err');
    gameOver = true;
  }

  elGuess.select();
}

// Reset the game to a fresh state
function resetGame() {
  secret = makeSecret(MIN, MAX);
  attempts = 0;
  gameOver = false;
  elGuess.value = '';
  setStatus('New round. Make a guess!', 'ok');
  renderAttempts();
  elGuess.focus();
}

// Helpers

function makeSecret(min, max) {
  // Math.random() returns [0,1); scale and shift to min..max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pluralize(word, count) {
  // Small decision with switch
  switch (count) {
    case 1: return word;
    default: return `${word}s`;
  }
}

function renderAttempts() {
  elAttempts.textContent = `Attempts: ${attempts}`;

  // Loop to render one heart per remaining attempt
  const remaining = Math.max(0, MAX_ATTEMPTS - attempts);
  let hearts = '';
  for (let i = 0; i < remaining; i++) {
    hearts += '❤️';
  }
  elHearts.textContent = hearts;
}

function setStatus(message, kind) {
  elStatus.textContent = message;
  elStatus.classList.remove('status-ok', 'status-warn', 'status-err');
  if (kind === 'ok') elStatus.classList.add('status-ok');
  if (kind === 'warn') elStatus.classList.add('status-warn');
  if (kind === 'err') elStatus.classList.add('status-err');
}

