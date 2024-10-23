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