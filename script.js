const btnNewGame = document.getElementById("newGame");
const btnRollDice = document.getElementById("rollDice");
const btnHold = document.getElementById("hold");
const dice = document.getElementById("dice");

const field1 = document.getElementById("field1");
const field2 = document.getElementById("field2");

let player, round, global, playingGame;
startGame();

function startGame() {
  //reset variable
  player = 1; // active player
  round = 0;
  global = [0, 0]; // keep total scores of player 1 and player 2
  // reset display
  dice.src = "./img/face0.svg";
  document.getElementById(`round1`).textContent = round;
  document.getElementById(`round2`).textContent = round;
  document.getElementById(`global1`).textContent = global[0];
  document.getElementById(`global2`).textContent = global[1];

  btnRollDice.addEventListener("click", rollDice);
}

function rollDice() {
  // allow to hold
  btnHold.addEventListener("click", addGlobal);
  // get the result
  let result = Math.floor(Math.random() * 6) + 1;
  // show the result
  dice.src = `./img/face${result}.svg`;
  //  process the result
  if (result === 1) {
    round = 0;
    document.getElementById(`round${player}`).textContent = round;
    changePlayer();
  } else {
    round += result;
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
    alert(`player${player} is the winner !!!`);
    // endgame remove roll and hold event listener
    btnRollDice.removeEventListener("click", rollDice);
    btnHold.removeEventListener("click", addGlobal);
  }
}

btnNewGame.addEventListener("click", startGame);
