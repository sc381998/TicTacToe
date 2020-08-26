let players = [];
let whoseTurn = 0;
let gameOver = false;
let xScore = 0;
let oScore = 0;
let win = false;
let player1 = "";
let player2 = "";
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
const startGame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  console.log(input1);
  if (input1 != null) {
    player1 = input1.value;
  } else {
    player1 = "X";
  }
  if (input2 != null) {
    player2 = input2.value;
  } else {
    player2 = "O";
  }
  console.log(123);
  if (isEmpty(player1) || isEmpty(player2)) {
    alert("player name is required");
    return;
  }

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  players.push(player1);
  players.push(player2);

  let cont1 = document.getElementById("container1");
  cont1.classList.remove("hide");
  let cont0 = document.getElementById("container0");
  cont0.classList.add("hide");
};

const isEmpty = (value) => !value || !value.trim();

const isWinner = () => {
  if (whoseTurn < 4) {
    return false;
  }

  const winnerCombinations = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["20", "11", "02"]
  ];
  for (let i = 0; i < winnerCombinations.length; i++) {
    let [val1, val2, val3] = winnerCombinations[i];

    if (
      board[val1[0]][val1[1]] !== "" &&
      board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
      board[val1[0]][val1[1]] === board[val3[0]][val3[1]]
    ) {
      win = true;
      return true;
    }
  }
  return false;
};

const handleClick = (el) => {
  if (el.innerHTML !== "" || gameOver) return;
  let id = el.id;
  let i = parseInt(id[0]);
  let j = parseInt(id[1]);

  board[i][j] = whoseTurn % 2 === 0 ? "X" : "0";
  if (board[i][j] === "0") el.classList.add("text-white");
  el.innerHTML = board[i][j];
  document.getElementById("turn").innerHTML = `${
    whoseTurn % 2 === 0 ? "O" : "X"
  } Turn`;

  if (isWinner() && win) {
    let player = players[whoseTurn % 2];
    let gameGrid = document.getElementById("game-grid");
    gameGrid.classList.remove("game-grid");

    if (player === player1) {
      gameGrid.classList.add("xWinner");
      window.localStorage.setItem("xScore", ++xScore);
      window.localStorage.setItem("oScore", oScore);
    } else {
      gameGrid.classList.add("oWinner");
      window.localStorage.setItem("oScore", ++oScore);
      window.localStorage.setItem("xScore", xScore);
    }
    document.getElementsByClassName(
      "xScore"
    )[0].innerHTML = localStorage.getItem("xScore");
    document.getElementsByClassName(
      "oScore"
    )[0].innerHTML = localStorage.getItem("oScore");

    gameGrid.innerHTML = `<div id="winner" class="" style="font-size:75px;">Winner!</div>`;
    document.getElementById("turn").innerHTML = "Game Over";
    //document.getElementById("winner").classList.remove("hide");
    document.getElementById("restart").classList.remove("hide");
    gameOver = true;
    return;
  }

  whoseTurn++;

  if (whoseTurn === 9) {
    let gameGrid = document.getElementById("game-grid");
    gameGrid.classList.remove("game-grid");

    gameGrid.classList.add("xoWinner");
    gameGrid.innerHTML = `<div id="winner" class="" style="font-size:75px;">Draw!</div>`;

    document.getElementById("turn").innerHTML = "Game Over";
    document.getElementById("restart").classList.remove("hide");
    gameOver = true;
    return;
  }
};

const restartGame = () => {
  let game_grid = document.getElementById("game-grid");
  game_grid.classList.remove("hide");
  game_grid.classList.add("game-grid");

  let win = document.getElementById("winner");
  win.classList.add("hide");
  document.getElementById("restart").classList.add("hide");

  if (whoseTurn % 2 === 0) game_grid.classList.remove("xWinner");
  else game_grid.classList.remove("oWinner");
  game_grid.classList.remove("xoWinner");

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", i.toString() + j.toString());
      cell.setAttribute("onclick", "handleClick(this)");
      cell.classList.add("cell");
      game_grid.appendChild(cell);
    }
  }
  gameOver = false;
  win = false;
  whoseTurn = 0;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
};
