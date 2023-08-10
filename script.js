'use strict';

// 1. Create a random secretNumber between 1 and 20

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let checkCount = 0;

// [?] whey adding (+1)?
// [Ans] because Math.random() generates a secretNumber between 0 and 1 (not including 1)

// [?] what is the use of Math.trunc()?
// [Ans] Math.trunc() function returns the integer part of a secretNumber by removing any fractional digits.

//2. Create a variable to store the guess secretNumber
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  let score = Number(document.querySelector('.score').textContent);

  // 3. When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number!';
  }

  // 4. When player wins
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('.number').textContent = secretNumber;
    //store the high score
    document.querySelector('.highscore').textContent = score;
    document.querySelector('body').classList.add('win');
    //Reset the game after 3 seconds
    setTimeout(ResetGame, 3000);
  }

  // 5 When the guess is wrong reduce the score by 1
  else if (guess !== secretNumber) {
    document.querySelector('.score').textContent = score - 1;
    // 5. When guess is too high
    if (guess - secretNumber >= 5) {
      document.querySelector('.message').textContent = '📈 Too High!';
    }

    // 6. When guess is just high
    else if (guess - secretNumber < 5 && guess - secretNumber > 0) {
      document.querySelector('.message').textContent = '📈 High!';
    }

    // 7. When guess is just low
    else if (secretNumber - guess < 5 && secretNumber - guess > 0) {
      document.querySelector('.message').textContent = '📉 Low!';
    }

    // 8. When guess is too low
    else if (secretNumber - guess >= 5) {
      document.querySelector('.message').textContent = '📉 Too Low!';
    }
  }

  // 9 create a variable to store the check count every time the check button is clicked
  checkCount = checkCount + 1;

  // 10. When the check button is clicked 10 times end the game then reset the game after 3 seconds
  if (checkCount === 20) {
    document.querySelector('.message').textContent = '😢 You Lost The Game!';
    document.querySelector('.score').textContent = 0;
    setTimeout(ResetGame, 3000);
  }
});

//Reset the game after x seconds
const ResetGame = function () {
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = 20;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').classList.remove('win');
};

// 11. When the again button is clicked reset the game
document.querySelector('.again').addEventListener('click', ResetGame);

// 12. click on check button when enter key is pressed
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.check').click();
  }
});
