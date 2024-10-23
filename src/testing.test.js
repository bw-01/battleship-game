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

describe.skip("Gameboard Tests", () => {
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
    expect(gameboard.grid[x][y].beenHit).toBe(true);
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

describe("Player Tests", () => {
  test("Creating a new player", () => {
    const player1 = new Player("Bob", false);

    expect(player1.name).toBe("Bob");
    expect(player1.cpuPlayer).toBe(false);
  });
});
