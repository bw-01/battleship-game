import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";

describe.skip("Ship Class Tests", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("Ship1", 2);
  });

  test("New ship is afloat and unhit", () => {
    expect(ship.isSunk()).toBe(false);
    expect(ship.hits).toBe(0);
  });

  test("Hit counter increases by 1 when hit", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("Ship is not sunk before reaching its length", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship is sunk when hits equal length", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard Class Tests", () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship("Ship1", 2);
    gameboard.placeShip(ship, 0, 0, ship.length, "horizontal"); // place a test ship at 0,0
  });

  test("Place and get ship at specific coordinates", () => {
    const x = 0,
      y = 0;

    expect(gameboard.grid[x][y].ship).toEqual(ship);
    expect(gameboard.grid[x + ship.length - 1][y].ship).toEqual(ship);
  });

  test("Test ship is hit when attacked", () => {
    const x = 0,
      y = 0;

    expect(gameboard.receiveAttack(x, y)).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test("Check missed shots are recorded", () => {
    const x = 1,
      y = 1;

    expect(gameboard.receiveAttack(x, y)).toBe(false);
    expect(ship.hits).toBe(0);
    expect(gameboard.grid[x][y].alreadyHit).toBe(true);
  });

  test("Check board reports not all ships have sunk", () => {
    ship.hit();

    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test("Check board reports when all ships have sunk", () => {
    ship.hit();
    ship.hit();

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});

describe("Player Class Tests", () => {
  let player;
  const SHIPS = [
    { name: "Destroyer", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Battleship", length: 4 },
  ];

  beforeEach(() => {
    player = new Player("TestPlayer", false);
  });

  test("Creating a new player", () => {
    expect(player.name).toBe("TestPlayer");
    expect(player.cpuPlayer).toBe(false);
  });

  test("placeShipsRandomly places all ships on the board", () => {
    player.placeShipsRandomly(SHIPS);

    SHIPS.forEach((ship) => {
      let shipFound = false;

      for (let x = 0; x < player.gameboard.size; x++) {
        for (let y = 0; y < player.gameboard.size; y++) {
          const cell = player.gameboard.grid[x][y];

          if (cell.ship && cell.ship.name === ship.name && cell.ship.length === ship.length) {
            shipFound = true;
            break;
          }
        }
        if (shipFound) break;
      }

      expect(shipFound).toBe(true);
    });
  });

  test("Ships are not placed overlapping each other", () => {
    player.placeShipsRandomly(SHIPS);

    const occupiedCoordinates = new Set();

    for (let x = 0; x < player.gameboard.size; x++) {
      for (let y = 0; y < player.gameboard.size; y++) {
        const cell = player.gameboard.grid[x][y];
        if (cell.ship) {
          const coord = `${x},${y}`;
          expect(occupiedCoordinates.has(coord)).toBe(false);
          occupiedCoordinates.add(coord);
        }
      }
    }
  });
});
