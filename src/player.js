import Gameboard from "./gameboard";
import Ship from "./ship.js";

class Player {
  constructor(name, ai = false) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.cpuPlayer = ai;
  }

  placeShipsRandomly(SHIPS) {
    SHIPS.forEach((shipElement) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        try {
          const ship = new Ship(shipElement.name, shipElement.length);
          this.gameboard.placeShip(ship, x, y, ship.length, direction);
          placed = true;
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          // ignore error
        }
      }
    });
  }
}

export default Player;
