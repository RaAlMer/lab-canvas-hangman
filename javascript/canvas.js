class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    let canvas = document.getElementById('hangman');
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.drawLines();
  }

  drawLines() {
    let secret = Array.from(this.secretWord);
    this.context.strokeStyle = "black";
    let x = 250;
    let y = 500;
    for (let letter in secret){
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(x + 50, y);
      this.context.stroke();
      this.context.closePath();
      x += 70;
    };
  }

  writeCorrectLetter(index) {
    let secret = Array.from(this.secretWord.toUpperCase());
    let x = 260;
    let y = 490;
    if (secret.includes(index)){
      let i = secret.indexOf(index);
      this.context.font = "50px Arial";
      this.context.fillText(index, x + 70 * i, y);
      //If there are two letters that are equal in the secret word
      if (secret.includes(index, i + 1)){
        let j = secret.indexOf(index, i + 1);
        this.context.font = "50px Arial";
        this.context.fillText(index, x + 70 * j, y);
      };
    };
    console.log(secret);
  }

  writeWrongLetter(letter, errorsLeft) {
    let secret = Array.from(this.secretWord.toUpperCase());
    let x = 1100;
    let y = 200;
    if (!secret.includes(letter)){
      this.context.font = "50px Arial";
      this.context.fillText(letter, x - 35 * errorsLeft, y);
    };
    console.log(errorsLeft);
  }

  drawHangman(errorsLeft) {
    switch(errorsLeft){
      case 9:
        //Base
        this.context.strokeStyle = "black";
        this.context.beginPath();
        this.context.moveTo(100, 500);
        this.context.lineTo(200, 500);
        this.context.lineTo(150, 450);
        this.context.lineTo(100, 500);
        this.context.stroke();
        this.context.closePath();
        break;
      case 8:
        //Vertical stick
        this.context.beginPath();
        this.context.moveTo(150, 450);
        this.context.lineTo(150, 100);
        this.context.stroke();
        this.context.closePath();
        break;
      case 7:
        //Horizontal stick
        this.context.beginPath();
        this.context.moveTo(150, 100);
        this.context.lineTo(400, 100);
        this.context.stroke();
        this.context.closePath();
        break;
      case 6:
        //Hook
        this.context.beginPath();
        this.context.moveTo(400, 100);
        this.context.lineTo(400, 150);
        this.context.stroke();
        this.context.closePath();
        break;
      case 5:
        //Head
        this.context.beginPath();
        this.context.arc(400, 180, 30, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
        break;
      case 4:
        //Body
        this.context.beginPath();
        this.context.moveTo(400, 210);
        this.context.lineTo(400, 310);
        this.context.stroke();
        this.context.closePath();
        break;
      case 3:
        //First leg
        this.context.beginPath();
        this.context.moveTo(400, 310);
        this.context.lineTo(450, 360);
        this.context.stroke();
        this.context.closePath();
        break;
      case 2:
        //Second leg
        this.context.beginPath();
        this.context.moveTo(400, 310);
        this.context.lineTo(350, 360);
        this.context.stroke();
        this.context.closePath();
        break;
      case 1:
        //First arm
        this.context.beginPath();
        this.context.moveTo(400, 230);
        this.context.lineTo(450, 270);
        this.context.stroke();
        this.context.closePath();
        break;
      case 0:
        //Second arm
        this.context.beginPath();
        this.context.moveTo(400, 230);
        this.context.lineTo(350, 270);
        this.context.stroke();
        this.context.closePath();
        break;
    }
  }

  gameOver() {
    this.context.clearRect(50, 50, 600, 400);
    const img = new Image()
    img.src = "./images/gameover.png"
    img.onload = () => {
      this.context.drawImage(img, 200, 100, 570, 240)
    }
  }

  winner() {
    this.context.clearRect(50, 50, 600, 400);
    const img = new Image()
    img.src = "./images/awesome.png"
    img.onload = () => {
      this.context.drawImage(img, 200, 100, 872, 618)
    }
  }
}
