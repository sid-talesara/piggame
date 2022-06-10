'use strict';
//⬇⬇⬇⬇⬇⬇⬇⬇  selecting elements  ⬇⬇⬇⬇⬇⬇⬇⬇
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const playerOneMainScore = document.querySelector('#score--0');
const playerTwoMainScore = document.querySelector('#score--1');
const playerOneCurrentScore = document.querySelector('#current--0');
const playerTwoCurrentScore = document.querySelector('#current--1');
const diceImg = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//declariong global variables
let dice = Math.trunc(Math.random() * 6) + 1;
let currentScore, activePlayer, scores, playing;

//⬇⬇⬇⬇⬇⬇⬇⬇   inilization function    ⬇⬇⬇⬇⬇⬇⬇⬇
const initilization = function () {
  //⬇⬇⬇⬇⬇⬇⬇⬇   starting conditions   ⬇⬇⬇⬇⬇⬇⬇⬇
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  playerOneMainScore.textContent = 0;
  playerTwoMainScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  diceImg.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

//⬇⬇⬇⬇⬇⬇⬇⬇   Calling the inilization function as the page loads   ⬇⬇⬇⬇⬇⬇⬇⬇
initilization();

//⬇⬇⬇⬇⬇⬇⬇⬇   toggle function    ⬇⬇⬇⬇⬇⬇⬇⬇
const togglePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//----------------------------------------------------------------
//⬇⬇⬇⬇⬇⬇⬇⬇   roll dice button function   ⬇⬇⬇⬇⬇⬇⬇⬇
btnRollDice.addEventListener('click', function () {
  if (playing) {
    //generating a random number between 1-6
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //displaying the dice
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    //check for other conditions
    if (dice !== 1) {
      //add dice to current score
      console.log(`The score is ${(currentScore += dice)}`);

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //check for rolled 1
    else if (dice === 1) {
      console.log('Game Over');
      //switch to new player
      togglePlayer();
    }
  }
});

//⬇⬇⬇⬇⬇⬇⬇⬇   hold button function   ⬇⬇⬇⬇⬇⬇⬇⬇
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player
    scores[activePlayer] += currentScore;
    //score[1]=score[1]+currentScore 👆
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if score is >= 100
    if (scores[activePlayer] >= 10) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceImg.classList.add('hidden');
      diceImg.src = `dice-${dice}.png`;
    } else {
      //switch the player
      togglePlayer();
    }
  }
});

//⬇⬇⬇⬇⬇⬇⬇⬇   New button function   ⬇⬇⬇⬇⬇⬇⬇⬇
btnNew.addEventListener('click', initilization);
