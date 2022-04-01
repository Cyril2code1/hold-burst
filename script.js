const btnNewGame = document.getElementById("newGame");
const btnRollDice = document.getElementById("rollDice");
const btnHold = document.getElementById("hold");
const dice = document.getElementById("dice");

const field1 = document.getElementById("field1");
const field2 = document.getElementById("field2");

const global1 = document.getElementById('global1');
const global2 = document.getElementById('global2');


const round1 = document.getElementById(`round1`);
const round2 = document.getElementById(`round2`);

let player, round, global, playingGame;

startGame();

function startGame() {

  //reset variable
  global1.classList.remove("winner");
  global2.classList.remove("winner");
  player = 1; // player 1 will start the game
  round = 0;
  global = [0, 0]; // keep total scores for player 1 and player 2

  // reset display
  dice.src = "./img/face0.svg";
  dice.classList.remove("shadow");
  round1.textContent = round;
  round2.textContent = round;
  global1.textContent = global[0];
  global2.textContent = global[1];

  // set field1 (for player1) to active
  field1.classList.add("active");
  field2.classList.remove("active");

  // just need to roll dice, no need to hold when the game start
  btnRollDice.addEventListener("click", rollDice);
}

function rollDice() {
  // allow to hold
  btnHold.addEventListener("click", addGlobal);

  // get the result
  let result = Math.floor(Math.random() * 6) + 1;

  // show the result
  dice.src = `./img/face${result}.svg`;

  // add the shadow for the dice
  dice.classList.add("shadow");

  //  process the result
  if (result === 1) {
    changePlayer();
  } else {
    // calc new total round
    round += result;

    // show total round
    document.getElementById(`round${player}`).textContent = round;
  }
}
function changePlayer() {
  // reset round
  round = 0;

  // show round
  document.getElementById(`round${player}`).textContent = round;

  // prevent next player to hold a void score
  btnHold.removeEventListener("click", addGlobal);

  //toggle active class to switch the active field
  field1.classList.toggle("active");
  field2.classList.toggle("active");

  // change player
  player = player === 1 ? 2 : 1;
}

function addGlobal() {
  // new global
  global[player - 1] += round;

  // show global
  document.getElementById(`global${player}`).textContent = global[player - 1];

  if (global[player - 1] < 100) {
    // change player
    changePlayer();
  } else {
    // player = winner
    document.getElementById(`global${player}`).classList.add("winner");

    // endgame: remove roll and hold event listener
    btnRollDice.removeEventListener("click", rollDice);
    btnHold.removeEventListener("click", addGlobal);
  }
}
// start game event listener always active
btnNewGame.addEventListener("click", startGame);
