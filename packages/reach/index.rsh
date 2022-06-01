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
  const V = View("Reader", {
    getBoard: BOARD,
    getTurn: Bytes(1),
    readyToPlay: Bool,
    getBlueAddress: Address,
    getRedAddress: Address,
    getHowMany: UInt,
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

  const [keepGoing, winner, pot, howMany, turn, board, redPlayer, bluePlayer] =
    parallelReduce([
      true,
      "0",
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
      getAddress(),
      getAddress(),
    ])
      .define(() => {
        V.getBoard.set([
          board[0],
          board[1],
          board[2],
          board[3],
          board[4],
          board[5],
        ]);
        V.getTurn.set(turn);
        V.readyToPlay.set(howMany == 2);
        V.getBlueAddress.set(bluePlayer);
        V.getRedAddress.set(redPlayer);
        V.getHowMany.set(howMany);
        const inBounds = (x, y) => {
          return x < 7 && x >= 0 && y < 6 && y >= 0;
        };
        const checkLine = (a, b, c, d) => {
          if (a == "0") {
            return false;
          } else {
            const win = a == b && a == c && a == d;
            if (win) {
              return true;
            } else {
              return false;
            }
          }
        };
      })
      .invariant(true)
      .while(keepGoing)
      // check winner
      .api(
        UTIL.checkWinner,
        (x, y, direction) => {
          check(howMany == 2, "needs to be 2");
          check(redPlayer != getAddress(), "red needs to be set");
          check(bluePlayer != getAddress(), "blue needs to be set");
          check(winner == "0", "no winner yet");
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
          check(howMany == 2, "needs to be 2");
          check(redPlayer != getAddress(), "red needs to be set");
          check(bluePlayer != getAddress(), "blue needs to be set");
          check(winner == "0", "no winner yet");
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
            const checked = checkLine(
              row[x],
              row[x + 1],
              row[x + 2],
              row[x + 3]
            );
            if (checked) {
              k(row[x]);
              return [
                false,
                row[x],
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
            } else {
              k("N");
              return [
                keepGoing,
                winner,
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
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
              return [
                keepGoing,
                zero[x],
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
            } else {
              k("N");
              return [
                false,
                winner,
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
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
              return [
                false,
                zero[x],
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
            } else {
              k("N");
              return [
                keepGoing,
                winner,
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
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
              return [
                false,
                zero[x],
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
            } else {
              k("N");
              return [
                keepGoing,
                winner,
                pot,
                howMany,
                turn,
                board,
                redPlayer,
                bluePlayer,
              ];
            }
          } else {
            k("N");
            return [
              keepGoing,
              winner,
              pot,
              howMany,
              turn,
              board,
              redPlayer,
              bluePlayer,
            ];
          }
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
          return [
            keepGoing,
            winner,
            pot + price,
            howMany + 1,
            turn,
            board,
            redPlayer,
            this,
          ];
        }
      )
      .api(
        BP.makeMove,
        (x, y) => {
          check(howMany == 2, "full");
          check(bluePlayer == this);
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
          check(bluePlayer == this);
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
          return [
            keepGoing,
            winner,
            pot,
            howMany,
            "R",
            updated,
            redPlayer,
            bluePlayer,
          ];
        }
      )
      // Red Player Actions
      .api(
        RP.acceptGame,
        () => {
          check(redPlayer == getAddress(), "not set yet");
          check(howMany <= 2, "not full");
          check(!opponents.member(this), "they haven't joined already");
        },
        () => price, // transfer amount
        (k) => {
          check(redPlayer == getAddress(), "not set yet");
          check(howMany <= 2, "not full");
          check(!opponents.member(this), "they haven't joined already");
          opponents.insert(this);
          k(true);
          return [
            keepGoing,
            winner,
            pot + price,
            howMany + 1,
            turn,
            board,
            this,
            bluePlayer,
          ];
        }
      )
      .api(
        RP.makeMove,
        (x, y) => {
          check(redPlayer == this);
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
          check(redPlayer == this);
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
          return [
            keepGoing,
            winner,
            pot,
            howMany,
            "B",
            updated,
            redPlayer,
            bluePlayer,
          ];
        }
      )
      // Games over protocol
      .timeout(absoluteTime(deadline), () => {
        const [[], k] = call(UTIL.timesUp);
        if (balance() >= price && winner == "0") {
          if (bluePlayer != getAddress()) {
            check(bluePlayer != getAddress());
            check(balance() >= price);
            transfer(price).to(bluePlayer);
          }
          if (redPlayer != getAddress()) {
            check(redPlayer != getAddress());
            check(balance() >= price);
            transfer(price).to(redPlayer);
          }
        }

        k(true);
        return [
          false,
          winner,
          pot,
          howMany,
          turn,
          board,
          redPlayer,
          bluePlayer,
        ];
      });
  if (balance() > 0) {
    if (winner == "B" && bluePlayer != getAddress()) {
      check(winner == "B");
      check(bluePlayer != getAddress());
      transfer(balance()).to(bluePlayer);
    } else if (winner == "R" && redPlayer != getAddress()) {
      check(winner == "R");
      check(redPlayer != getAddress());
      transfer(balance()).to(redPlayer);
    } else {
      transfer(balance()).to(D);
    }
  }
  // if (price > 0) {
  //   if (winner == "R" && redPlayer != getAddress()) {
  //     transfer(pot).to(redPlayer);
  //   }
  //   if (winner == "B" && bluePlayer != getAddress()) {
  //     transfer(pot).to(bluePlayer);
  //   }
  // }

  commit();

  exit();
});
