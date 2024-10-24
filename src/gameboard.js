//import Ship from "./ship.js";

// Create and manage the game board
class Gameboard {
  constructor(size = 10) {
    this.size = size; // size of the board
    this.grid = Array(10) // the game grid
      .fill(null)
      .map(() =>
        Array(10)
          .fill(null)
          .map(() => new Cell())
      );
    this.ships = []; // holds the ships on the board
  }

  placeShip(ship, x, y, length, direction) {
    if (direction === "horizontal" && x + length > this.size) {
      throw new Error("Ship goes out of bounds horizontally!");
    }
    if (direction === "vertical" && y + length > this.size) {
      throw new Error("Ship goes out of bounds vertically!");
    }

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal" && this.grid[x + i][y].ship !== null) {
        throw new Error("Ship overlap detected!");
      }
      if (direction === "vertical" && this.grid[x][y + i].ship !== null) {
        throw new Error("Ship overlap detected!");
      }
    }

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        this.grid[x + i][y].ship = ship;
      }
      if (direction === "vertical") {
        this.grid[x][y + i].ship = ship;
      }
    }

    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    const cell = this.grid[x][y];
    if (cell.alreadyHit) {
      return false; // already attached this cell so do nothing
    }

    cell.alreadyHit = true;

    if (cell.hasShip()) {
      cell.ship.hit();
      return true; // hit
    } else {
      return false; // miss
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

// Store if a cell is hit and any ship it might contain
class Cell {
  constructor() {
    this.ship = null; // holds ship object if placed in cell
    this.alreadyHit = false; // store if cell has been hit previously
  }

  hasShip() {
    return this.ship !== null;
  }
}

export default Gameboard;
