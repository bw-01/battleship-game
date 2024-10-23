//import Ship from "./ship.js";

// Create and update the game board
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
    if (cell.beenHit) {
      // already attached
      return false;
    }

    cell.beenHit = true;

    if (cell.ship) {
      cell.ship.hit();
      return true; // hit
    } else {
      return false; // miss
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

// Store the status of each grid cell
class Cell {
  constructor() {
    this.ship = null;
    this.beenHit = false;
  }
}

export default Gameboard;
