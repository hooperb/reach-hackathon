/* eslint-disable no-array-constructor */
/* eslint-disable arrow-body-style */
"reach 0.1";
"use strict";

const BOARD = Tuple(
  Array(Bytes(1), 8),
  Array(Bytes(1), 8),
  Array(Bytes(1), 8),
  Array(Bytes(1), 8),
  Array(Bytes(1), 8),
  Array(Bytes(1), 8)
);

export const main = Reach.App(() => {
  const D = Participant("Admin", {
    price: UInt,
    deadline: UInt,
    ready: Fun([], Null),
  });
  const RP = API("RedPlayer", {
    acceptGame: Fun([], Bool),
    makeMove: Fun([UInt, UInt], Bool),
    // timesUp: Fun([], Bool),
  });
  const BP = API("BluePlayer", {
    getBoard: Fun([], BOARD),
    acceptGame: Fun([], Bool),
    makeMove: Fun([UInt, UInt], Bool),
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

  const [pot, howMany, turn, board] = parallelReduce([
    0,
    0,
    "R", // start on red
    [
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0", "0"]), // zero
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0", "0"]), // two
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0", "0"]), // three
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0", "0"]), // four
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0", "0"]), // five
      array(Bytes(1), ["0", "0", "0", "0", "0", "0", "0", "0"]), // six
    ],
  ])
    .define(() => {
      const inBounds = (x, y) => {
        return x < 7 && x >= 0 && y < 6 && y >= 0;
      };
    })
    .invariant(true && balance() == pot && !winner)
    .while(keepGoing)
    .api(BP.getBoard, (k) => {
      k(board);
      return [pot, howMany, turn, board];
    })
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
      },
      (_, _) => 0,
      (x, y, k) => {
        check(howMany == 2, "full");
        check(opponents.member(this), "real player");
        check(turn == "B");
        check(inBounds(x, y), "x,y good!");
        k(true);
        // const copy = Array.set(zero, y, "B");
        return [pot, howMany, "R", board];
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
        check(turn == "R");
        check(inBounds(x, y), "x,y good!");
      },
      (_, _) => 0,
      (x, y, k) => {
        check(howMany == 2, "full");
        check(opponents.member(this), "real player");
        check(turn == "R");
        check(inBounds(x, y), "x,y good!");
        k(true);
        return [pot, howMany, "R", board];
      }
    )
    // Games over protocol
    .timeout(absoluteTime(deadline), () => {
      const [[], k] = call(BP.timesUp);
      k(true);
      return [pot, howMany, turn, board];
    });
  if (winner && pot > 0) {
    transfer(pot).to(D);
  }

  commit();

  exit();
});
