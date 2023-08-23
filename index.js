let guesses = [];
const answer = Math.floor(Math.random() * 99 + 1);
const hint = [
  answer,
  Math.floor(Math.random() * 99 + 1),
  Math.floor(Math.random() * 99 + 1),
];
hint.sort((a, b) => a - b);
let winner = false;
let disabled = false;

const input = document.getElementById("guess");
const makeGuess = document.getElementById("make_guess");
const gameStatus = document.getElementById("game_status");
const gameHint = document.getElementById("game_hint");
const guess1 = document.getElementById("guess1");
const guess2 = document.getElementById("guess2");
const guess3 = document.getElementById("guess3");
const guess4 = document.getElementById("guess4");
const guess5 = document.getElementById("guess5");
const resetButton = document.getElementById("reset");
const hintButton = document.getElementById("hint");

function turn() {
  if (disabled) return;
  if (guesses.includes(parseInt(input.value))) {
    gameStatus.innerText = "You Have Already Guessed That Number!";
    gameHint.innerText = "Guess Again!";
    input.value = "";
    return;
  }
  guesses.push(parseInt(input.value));
  const guess = parseInt(input.value);
  if (guess === answer) {
    gameStatus.innerText = `You Win! The Winning Number was ${answer}`;
    disabled = true;
    input.disabled = true;
    return;
  } else if (guess < answer) {
    if (answer - guess > 25) {
      gameStatus.innerText = "You're Ice Cold!";
      gameHint.innerText = "Guess Higher!";
    } else if (answer - guess > 15) {
      gameStatus.innerText = "You're Warming Up!";
      gameHint.innerText = "Guess Higher!";
    } else {
      gameStatus.innerText = "You're Burning Up!";
      gameHint.innerText = "Guess Higher!";
    }
  } else {
    if (Math.abs(answer - guess) > 25) {
      gameStatus.innerText = "You're Ice Cold!";
      gameHint.innerText = "Guess Lower!";
    } else if (Math.abs(answer - guess) > 15) {
      gameStatus.innerText = "You're Warming Up!";
      gameHint.innerText = "Guess Lower!";
    } else {
      gameStatus.innerText = "You're Burning Up!";
      gameHint.innerText = "Guess Lower!";
    }
  }
  guess1.innerText = guesses[0] || "-";
  guess2.innerText = guesses[1] || "-";
  guess3.innerText = guesses[2] || "-";
  guess4.innerText = guesses[3] || "-";
  guess5.innerText = guesses[4] || "-";
  input.value = "";

  if (guesses.length === 5 && winner === false) {
    disabled = true;
    input.disabled = true;
    gameStatus.innerText = `You Lose. The Winning Number Was ${answer}`;
    gameHint.innerText = "Reset The Game To Play Again!";
  }
}

makeGuess.addEventListener("click", () => turn());

resetButton.addEventListener("click", () => {
  guesses = [];
  gameStatus.innerText = "THE GUESSING GAME";
  gameHint.innerText = "Guess A Number Between 1-100";
  guess1.innerText = guesses[0] || "-";
  guess2.innerText = guesses[1] || "-";
  guess3.innerText = guesses[2] || "-";
  guess4.innerText = guesses[3] || "-";
  guess5.innerText = guesses[4] || "-";
  input.value = "";
});

hintButton.addEventListener("click", () => {
  gameStatus.innerText = `The Answer is ${hint[0]}, ${hint[1]} or ${hint[2]}`;
});
