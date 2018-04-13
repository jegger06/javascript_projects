let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);
  console.log(guess);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if Won
  if (guess === winningNum) {
    // Game Over Won
    gameOver(true, `${guess} is correct, You win!`)
  } else {
    // Wrong number
    guessesLeft -= 1;
    
    if (guessesLeft === 0) {
      // Game Over and lost
      gameOver(false, `Game Over, You lost. The correct number was ${winningNum}.`);
    } else {
      // Game continues and answer is wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
    }
  }
});


// Game Over
function gameOver(won, msg) {
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = won ? 'green' : 'red';
  // Set message
  setMessage(msg, won ? 'green' : 'red');

  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}