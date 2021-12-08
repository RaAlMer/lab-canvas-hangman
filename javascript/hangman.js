class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    let randomIndex = Math.floor(Math.random() * this.words.length);
    let randomWord = this.words[randomIndex];
    return randomWord;
  }

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90){
      return true;
    } else {
      return false;
    };
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter)){
      return false;
    } else {
      return true;
    };
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    this.letters.push(letter);
    return letter;
  }

  addWrongLetter(letter) {
    this.errorsLeft -= 1;
    this.letters.push(letter);
    return letter;
  }

  checkGameOver() {
    if (this.errorsLeft > 0){
      return false;
    } else {
      return true;
    };
  }

  checkWinner() {
    let secret = Array.from(this.secretWord.toUpperCase());
    let isEvery = secret.every(item => this.guessedLetters.includes(item));
    if (isEvery) {
      return true;
    } else {
      return false;
    }
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    hangmanCanvas.createBoard();
    hangmanCanvas.drawLines();
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  //Only if the keycode is true, it writes the letter
  if (hangman.checkIfLetter(event.which)){
    //Only if the letter was not clicked
    if (hangman.checkClickedLetters(event.key.toUpperCase())){
      let secret = Array.from(hangman.secretWord.toUpperCase());
      //Only if the secrer word includes the letter or not
      if (secret.includes(event.key.toUpperCase())){
        hangmanCanvas.writeCorrectLetter(hangman.addCorrectLetter(event.key.toUpperCase()));
      } else {
        hangmanCanvas.writeWrongLetter(hangman.addWrongLetter(event.key.toUpperCase()), hangman.errorsLeft);
      };      
    };
  };
  hangmanCanvas.drawHangman(hangman.errorsLeft);
  //If you lose
  if (hangman.checkGameOver()){
    hangmanCanvas.gameOver();
  };
  //If you win
  if (hangman.checkWinner()){
    hangmanCanvas.winner();
  }
});
