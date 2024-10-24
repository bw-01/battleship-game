import "./styles.css";

import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";

const player1 = new Player("Joe", false);
const player2 = new Player("Robotron 3000", true);
const p1Board = player1.gameboard;
const p2Board = player2.gameboard;

const SHIPS = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Destroyer", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Patrol Boat", length: 2 },
];

player1.placeShipsRandomly(SHIPS);
player2.placeShipsRandomly(SHIPS);

displayBoard(p1Board, ".player1 .gameboard");
displayBoard(p2Board, ".player2 .gameboard");

function displayBoard(gameboard, playerBoardDiv) {
  const boardDiv = document.querySelector(playerBoardDiv);
  boardDiv.innerHTML = "";

  for (let x = 0; x < gameboard.size; x++) {
    for (let y = 0; y < gameboard.size; y++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      if (gameboard.grid[x][y].hasShip()) {
        cellDiv.classList.add("ship");
      }

      if (gameboard.grid[x][y].alreadyHit) {
        cellDiv.classList.add(gameboard.grid[x][y].hasShip() ? "hit" : "miss");
      }

      cellDiv.addEventListener("click", () => handleAttack(x, y));

      boardDiv.appendChild(cellDiv);
    }
  }
}

function handleAttack(x, y) {
  p1Board.receiveAttack(x, y);
  displayBoard(p1Board, ".player1 .gameboard");
}
