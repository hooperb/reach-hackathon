/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";

// error handler
const willError = async (f) => {
  let e;
  try {
    await f();
    e = false;
  } catch (te) {
    e = te;
  }
  if (e === false) {
    throw Error(`Expected to error, but didn't`);
  }
  console.log(`That last call errored and that's okay`);
};

const stdlib = loadStdlib(process.env);
const sbal = stdlib.parseCurrency(100);
const users = await stdlib.newTestAccounts(3, sbal);
const accD = users[0];
const deadline = 100;

const deployedContract = accD.contract(backend);

// constructor
try {
  await deployedContract.p.Admin({
    deadline,
    price: stdlib.parseCurrency(25),
    ready: () => {
      console.log("The contract is ready");
      throw 42;
    },
  });
} catch (e) {
  if (e !== 42) {
    throw e;
  }
}

const B = 1;
const R = 2;

const acceptGame = async (whoi) => {
  const who = users[whoi];
  await stdlib.balanceOf(who);
  const contract = await who.contract(backend, deployedContract.getInfo());
  console.log(
    `Accepting game for: ${stdlib.formatAddress(who)} (${
      whoi === R ? "RED" : "BLUE"
    })`
  );
  whoi === R
    ? await contract.apis.RedPlayer.acceptGame()
    : await contract.apis.BluePlayer.acceptGame();
};

const timesup = async (whoi) => {
  console.log("I think time is up");
  const who = users[whoi];
  await stdlib.balanceOf(who);
  const contract = await who.contract(backend, deployedContract.getInfo());
  await contract.apis.Utility.timesUp();
};

const makeMove = async (whoi, x, y) => {
  const who = users[whoi];
  await stdlib.balanceOf(who);
  const contract = await who.contract(backend, deployedContract.getInfo());
  const test =
    whoi === B
      ? await contract.apis.BluePlayer.makeMove(x, y)
      : await contract.apis.RedPlayer.makeMove(x, y);
};

const isWinner = async (x, y, dir) => {
  const who = users[0];
  await stdlib.balanceOf(who);
  const contract = await who.contract(backend, deployedContract.getInfo());
  const winner = await contract.apis.Utility.checkWinner(x, y, dir);
  console.log("-------");
  console.log("The winner is (R = red, B = blue, N = No winner): ", winner);
  console.log("-------");
};

const boardView = async () => {
  const who = users[0];
  await stdlib.balanceOf(who);
  const contract = await who.contract(backend, deployedContract.getInfo());
  const winner = await contract.views.Reader.getBoard();
};

const readyToPlay = async () => {
  const who = users[0];
  const contract = await who.contract(backend, deployedContract.getInfo());
  const winner = await contract.views.Reader.readyToPlay();
  console.log("ready to play", winner);
};
// needs to be one of A, D, L, R
const gameScenario = "R";
// test the user winning with a horizontal line
if (gameScenario == "A") {
  await acceptGame(B);
  await acceptGame(R);
  await getBoard(B);
  await makeMove(B, 0, 0);
  await makeMove(R, 0, 1);
  await makeMove(B, 1, 0);
  await makeMove(R, 0, 2);
  await makeMove(B, 2, 0);
  await makeMove(R, 0, 3);
  await makeMove(B, 3, 0);
  // Blue should win
  await isWinner(0, 0, "A");
  await getBoard(B);

  // test the user winning with a downline
} else if (gameScenario == "D") {
  await acceptGame(B);
  await acceptGame(R);
  await makeMove(B, 0, 0);
  await makeMove(R, 0, 1);
  await makeMove(B, 1, 0);
  await makeMove(R, 0, 2);
  await makeMove(B, 2, 0);
  await makeMove(R, 0, 3);
  await makeMove(B, 5, 0);
  await makeMove(R, 0, 4);
  // Red should win
  await isWinner(0, 1, "D");
  await getBoard(B);
  // test the user within the a left diagonal
} else if (gameScenario == "L") {
  // 0 0 0 B
  // 0 0 B R
  // 0 B B R
  // B R R R 0 R
  await acceptGame(B);
  await acceptGame(R);
  await makeMove(B, 0, 0);
  await makeMove(R, 1, 0);
  await makeMove(B, 1, 1);
  await makeMove(R, 2, 0);
  await makeMove(B, 2, 1);
  await makeMove(R, 3, 0);
  await makeMove(B, 2, 2);
  await makeMove(R, 3, 1);
  await makeMove(B, 3, 2);
  await makeMove(R, 5, 0);
  await makeMove(B, 3, 3);
  // Blue should win
  await isWinner(0, 0, "L");
  await getBoard(B);
} else if (gameScenario == "R") {
  // R
  // B R
  // R R R
  // B B B R B
  await boardView();
  await acceptGame(R);
  await acceptGame(B);
  await readyToPlay();
  await makeMove(B, 0, 0);
  await makeMove(R, 0, 1);
  await makeMove(B, 0, 2);
  await makeMove(R, 0, 3);
  await makeMove(B, 1, 0);
  await makeMove(R, 1, 1);
  await makeMove(B, 2, 0);
  await makeMove(R, 1, 2);
  await makeMove(B, 4, 0);
  await boardView();
  await makeMove(R, 2, 1);
  await makeMove(B, 5, 0);
  await makeMove(R, 3, 0);
  // Red should win
  await isWinner(0, 3, "R");
}

// await timesup(R);

for (const who of users) {
  console.warn(
    stdlib.formatAddress(who),
    "has",
    stdlib.formatCurrency(await stdlib.balanceOf(who)),
    who === B ? "Blue" : "Red"
  );
}
