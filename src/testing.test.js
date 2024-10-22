import Ship from "./ship.js";

describe("Ship Class Tests", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("Battleship", 2);
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
