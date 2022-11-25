



//GAME

//Var
const boxes = document.querySelectorAll(".box");
const playerX = "🎐";
const playerO = "🌸";
let turn = playerX;
const players = document.querySelectorAll(".player");
let nameJ1= ""
let nameJ2= ""


const boardState = Array(boxes.length);
boardState.fill(null);

// Elements

const strike = document.getElementById("strike");
const gameOverDiv = document.getElementById("game-over-div");
const gameOverText = document.getElementById("game-over-text");
const winnerScreen = document.getElementById("winner-screen");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);
const iptName1= document.getElementById("player1")
const iptName2= document.getElementById("player2")
iptName1.addEventListener("keyup",()=> {
  nameJ1 = iptName1.value
  console.log(nameJ1)
})
iptName2.addEventListener("keyup",()=> {
  nameJ2 = iptName2.value
  console.log(nameJ2)
})





// Click on board

boxes.forEach((box) => box.addEventListener("click", boxClick));

function boxClick(event) {
  if (gameOverDiv.classList.contains("visible")) {
    return;
  }

  const box = event.target;
  const boxNumber = box.dataset.index;
  if (box.innerText != "") {
    return;
  }

  if (turn === playerX) {
    let text = `Turno de ${nameJ1} `;
    box.innerText = playerX;
    boardState[boxNumber - 1] = playerX;
    turn = playerO;
    gameOverText.innerText = text;
  } else {
    let text = `Turno de ${nameJ2} `;
    box.innerText = playerO;
    boardState[boxNumber - 1] = playerO;
    turn = playerX;
    gameOverText.innerText = text;
  }
  checkWinner();
}

//Check winner

function checkWinner() {
  // check winner
  for (const winPosition of winPositions) {
    const combo = winPosition.combo;
    const strikeClass = winPosition.strikeClass;
    const boxValue1 = boardState[combo[0] - 1];
    const boxValue2 = boardState[combo[1] - 1];
    const boxValue3 = boardState[combo[2] - 1];

    if (
      boxValue1 != null &&
      boxValue1 === boxValue2 &&
      boxValue1 === boxValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(boxValue1);
      return;
    }
  }

  //check draw
  const allBoxesFull = boardState.every((box) => box !== null);
  if (allBoxesFull) {
    gameOverScreen(null);
  }
}

//Game over

function gameOverScreen(winnerText) {
  let text = "¡EMPATE!";
  if (winnerText != null && turn == playerX) {
    document.getElementById("info-winner").innerHTML = `¡GANA ${nameJ1}!`;
    document.getElementsByClassName("winner-screen")[0].style.display = "flex";
  }else if (winnerText != null && turn == playerO){
    document.getElementById("info-winner").innerHTML = `¡GANA ${nameJ2}!`;
    document.getElementsByClassName("winner-screen")[0].style.display = "flex";
  }else{
    document.getElementById("info-winner").innerHTML = `¡EMPATE!`;
    document.getElementsByClassName("winner-screen")[0].style.display = "flex";
  }
  winnerScreen.className = "visible";
  gameOverText.innerText = text;
}

// Start new game
function startNewGame() {
  // strike.className = "strike";
  // gameOverDiv.ClassName = "hidden";
  // boardState.fill(null);
  // boxes.forEach((box) => (box.innerText = ""));
  // turn = playerX;
  // players.forEach((player) => (player.innerText = ""));
  // return;
  location.reload();
}

// array win positions

const winPositions = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
