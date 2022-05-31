/* eslint-disable no-loop-func */
/* eslint-disable @shopify/prefer-early-return */
/* eslint-disable no-else-return */
/* eslint-disable no-array-constructor */
/* eslint-disable arrow-body-style */
"reach 0.1";
"use strict";

const BOARD = Tuple(
  Array(Bytes(1), 7),
  Array(Bytes(1), 7),
  Array(Bytes(1), 7),
  Array(Bytes(1), 7),
  Array(Bytes(1), 7),
  Array(Bytes(1), 7)
);

export const main = Reach.App(() => {
  setOptions({ untrustworthyMaps: true });
  const D = Participant("Admin", {
    price: UInt,
    deadline: UInt,
    ready: Fun([], Null),
  });
  const RP = API("RedPlayer", {
    acceptGame: Fun([], Bool),
    makeMove: Fun([UInt, UInt], Bool),
  });
  const BP = API("BluePlayer", {
    acceptGame: Fun([], Bool),
    makeMove: Fun([UInt, UInt], Bool),
  });

  const UTIL = API("Utility", {
    getBoard: Fun([], BOARD),
    checkWinner: Fun([UInt, UInt, Bytes(1)], Bytes(1)),
    timesUp: Fun([], Bool),
  });

  init();

  D.only(() => {
    const price = declassify(interact.price);
    const deadline = declassify(interact.deadline);
    check(price < 100000000);
  });
  D.publish(price, deadline);
  D.interact.ready();
  check(price < 100000000);

  const opponents = new Set();
  const keepGoing = true;
  const winner = false;

  const test = array(Bytes(1), ["0"]);

  const [pot, howMany, turn, board] = parallelReduce([
    0,
    0,
    "B", // start on blue
    array(Array(Bytes(1), 7), [
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0"]), // zero
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0"]), // two
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0"]), // three
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0"]), // four
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0"]), // five
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0"]), // six
    ]),
  ])
    .define(() => {
      const inBounds = (x, y) => {
        return x < 7 && x >= 0 && y < 6 && y >= 0;
      };
      const checkLine = (a, b, c, d) => {
        if (a == "0") {
          return false;
        } else {
          const win = a == b && a == c && a == d;
          if (win) {
            const update = test.set(0, a);
            check(update[0] == a);
            return true;
          } else {
            return false;
          }
        }
      };
    })
    .invariant(true && balance() == pot && !winner)
    .while(keepGoing)
    // UTIL
    .api(UTIL.getBoard, (k) => {
      // can't be assed defining BOARD type to be an array of arrays
      k([board[0], board[1], board[2], board[3], board[4], board[5]]);
      return [pot, howMany, turn, board];
    })
    .api(
      UTIL.checkWinner,
      (x, y, direction) => {
        check(inBounds(x, y), "x,y good!");
        check(
          direction == "A" ||
            direction == "D" ||
            direction == "L" ||
            direction == "R",
          "direction is good!"
        );
        if (direction == "A") {
          check(inBounds(x + 3, y), "ACROSS x,y good!");
        } else if (direction == "D") {
          check(inBounds(x, y + 3), "DOWN x,y good!");
        } else if (direction == "L") {
          check(inBounds(x + 3, y + 3), "LEFT x,y good!");
        } else {
          check(direction == "R");
          check(inBounds(x + 3, y - 3), "RIGHT x,y good!");
        }
      },
      (_, _, _) => 0,
      (x, y, direction, k) => {
        check(inBounds(x, y), "x,y good!");
        check(
          direction == "A" ||
            direction == "D" ||
            direction == "L" ||
            direction == "R",
          "direction is good!"
        );

        // check accross
        if (direction == "A") {
          check(inBounds(x + 3, y), "ACROSS x,y good!");
          const row = board[y];
          const checked = checkLine(row[x], row[x + 1], row[x + 2], row[x + 3]);
          if (checked) {
            k(row[x]);
          } else {
            k("N");
          }
          // check down
        } else if (direction == "D") {
          check(inBounds(x, y + 3), "DOWN x,y good!");
          const zero = board[y];
          const one = board[y + 1];
          const two = board[y + 2];
          const three = board[y + 3];
          const checked = checkLine(zero[x], one[x], two[x], three[x]);
          if (checked) {
            k(zero[x]);
          } else {
            k("N");
          }
          // check left diagonal
        } else if (direction == "L") {
          check(x < 4);
          check(inBounds(x + 3, y + 3), "LEFT x,y good!");
          const zero = board[y];
          const one = board[y + 1];
          const two = board[y + 2];
          const three = board[y + 3];
          const checked = checkLine(
            zero[x],
            one[x + 1],
            two[x + 2],
            three[x + 3]
          );
          if (checked) {
            k(zero[x]);
          } else {
            k("N");
          }
          // check right diagonal
        } else if (direction == "R") {
          check(inBounds(x + 3, y - 3), "RIGHT x,y good!");
          const zero = board[y];
          const one = board[y - 1];
          const two = board[y - 2];
          const three = board[y - 3];
          const checked = checkLine(
            zero[x],
            one[x + 1],
            two[x + 2],
            three[x + 3]
          );
          if (checked) {
            k(zero[x]);
          } else {
            k("N");
          }
        } else {
          k("N");
        }
        return [pot, howMany, turn, board];
      }
    )
    // Blue Player Actions
    .api(
      BP.acceptGame,
      () => {
        check(howMany <= 2, "not full");
        check(!opponents.member(this), "they haven't joined already");
      },
      () => price, // transfer amount
      (k) => {
        check(howMany <= 2, "not full");
        check(!opponents.member(this), "they haven't joined already");
        opponents.insert(this);
        k(true);
        return [pot + price, howMany + 1, turn, board];
      }
    )
    .api(
      BP.makeMove,
      (x, y) => {
        check(howMany == 2, "full");
        check(opponents.member(this), "real player");
        check(turn === "B");
        check(inBounds(x, y), "x,y good!");
        const row = board[y];
        if (y > 0) {
          const rowBelow = board[y - 1];
          check(rowBelow[x] != "0");
        }
        assume(row[x] == "0");
      },
      (_, _) => 0,
      (x, y, k) => {
        check(howMany == 2, "full");
        check(opponents.member(this), "real player");
        check(turn == "B");
        check(inBounds(x, y), "x,y good!");
        const row = board[y];
        if (y > 0) {
          const rowBelow = board[y - 1];
          check(rowBelow[x] != "0");
        }
        check(row[x] == "0");
        const update = board;
        const updateRow = board[y];
        const updatedRow = Array.set(updateRow, x, "B");
        const updated = Array.set(update, y, updatedRow);
        k(true);
        return [pot, howMany, "R", updated];
      }
    )
    // Red Player Actions
    .api(
      RP.acceptGame,
      () => {
        check(howMany <= 2, "not full");
        check(!opponents.member(this), "they haven't joined already");
      },
      () => price, // transfer amount
      (k) => {
        check(howMany <= 2, "not full");
        check(!opponents.member(this), "they haven't joined already");
        opponents.insert(this);
        k(true);
        return [pot + price, howMany + 1, turn, board];
      }
    )
    .api(
      RP.makeMove,
      (x, y) => {
        check(howMany == 2, "full");
        check(opponents.member(this), "real player");
        check(turn === "R");
        check(inBounds(x, y), "x,y good!");
        const row = board[y];
        if (y > 0) {
          const rowBelow = board[y - 1];
          check(rowBelow[x] != "0");
        }
        assume(row[x] == "0");
      },
      (_, _) => 0,
      (x, y, k) => {
        check(howMany == 2, "full");
        check(opponents.member(this), "real player");
        check(turn == "R");
        check(inBounds(x, y), "x,y good!");
        const row = board[y];
        if (y > 0) {
          const rowBelow = board[y - 1];
          check(rowBelow[x] != "0");
        }
        check(row[x] == "0");
        const update = board;
        const updateRow = board[y];
        const updatedRow = Array.set(updateRow, x, "R");
        const updated = Array.set(update, y, updatedRow);
        k(true);
        return [pot, howMany, "B", updated];
      }
    )
    // Games over protocol
    .timeout(absoluteTime(deadline), () => {
      const [[], k] = call(UTIL.timesUp);
      k(true);
      return [pot, howMany, turn, board];
    });
  if (pot > 0) {
    if (winner) {
      transfer(pot).to(D);
    }
  }

  commit();

  exit();
});
