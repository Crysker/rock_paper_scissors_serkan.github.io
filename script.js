
let images = document.getElementById('images');
let text = document.getElementById('text');
let buttonBox = document.getElementById('buttonBox');
let input = document.getElementById('input');

let playerName;


let currSound = new Audio();

let scenario = {
  start: {
    image: './images/give_name.jpg',
    text: 'First of all, please name yourself you unworthy opponent\n',
  
  },
  choice1: {
    image: "./images/rock_paper_scissors.jpg",
    text: 'Welcome <span class="player">PLAYER!!</span><br/>Rules: Choose either Rock, Paper or Scissors to battle your enemy.<br/>Rock > Scissors, Scissors > Paper, Paper > Rock ',
    buttons: [
      ['Rock', "winCon()",],
      ['Paper', "winCon()",],
      ['Scissors', "winCon()",],
    ],
  
  },
  draw: {
    image: './images/draw.png',
    text: 'Like there is a chance for you to wi..., wait what??? A DRAW',
    buttons: [[ 'Try again', 'advanceTo(scenario.choice1)',]],
    sound: './sound/what.mp3',

  
  },
  lose: {
 
    image: './images/lose.png',
    text: 'Seems like a mere mortal could not beat him, how pathetic',
    buttons: [['Try again', 'advanceTo(scenario.choice1)',]],
    sound: './sound/game-over.mp3',
  },
  win: {
    image: './images/win_computer.jpg',
    text: 'Oh wow, you rly beat him, no way? There must be a mistake, try again! NOWWWW!!!.',
    buttons:[['Try again', 'advanceTo(scenario.choice1)',]],
    sound: './sound/finish.mp3',
  },
};


function nameInput(event) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    playerName = input.value;
    input.style.display = 'none';
    input.value = '';
    advanceTo(scenario.choice1);
  }
}
function ballHitBrick() {
  score += 1;
  scoreText.setText('Points: '+score);
}

function winCon(){
if(0 == randomNumber()){
  advanceTo(scenario.win);
  

}else if (1 == randomNumber()){
  advanceTo(scenario.lose);
  
  
}else{
  advanceTo(scenario.draw);
  
}
}

function randomNumber(){
	var randomNumber = Math.floor(Math.random() * 3);
	return randomNumber;   
}



let changeText = function (words) {
  text.innerHTML = words.replace('PLAYER', playerName);
};


let changeImage = function (img) {
  images.style.backgroundImage = 'url(' + img + ')';
};


let changeButtons = function (buttonList) {
  buttonBox.innerHTML = '';
  if (buttonList === undefined) return;

  // [1] is the action and [0] is the text of the button
  for (let i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML += `<button class="btn btn-sm btn-primary" onclick=${buttonList[i][1]}>${buttonList[i][0]}</button>`;
  }
};

let changeSound = (soundSource) => {
  if (soundSource === undefined) return;

  currSound = new Audio(soundSource);
  currSound.play();
};


let advanceTo = function (scenario) {
  // Stop any current sound
  currSound.pause();

  changeImage(scenario.image);
  changeText(scenario.text);
  changeButtons(scenario.buttons);
  changeSound(scenario.sound);
};

function startGame() {
  document.querySelector('.greeting').style.display = 'none';
  document.querySelector('.gameArea').style.display = 'flex';
  input.style.display = 'inline';
  
  document.querySelector('body').classList.add('changeBackground');
  
  advanceTo(scenario.start);
}


function reset() {
  currSound.pause();
  document.querySelector('.greeting').style.display = 'flex';
  document.querySelector('.gameArea').style.display = 'none';
  document.querySelector('body').classList.remove('changeBackground');
  input.style.display = 'inline';
}