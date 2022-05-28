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
  console.log(`Accepting game for: ${stdlib.formatAddress(who)}`);
  whoi === R
    ? await contract.apis.RedPlayer.acceptGame()
    : await contract.apis.BluePlayer.acceptGame();
};

const getBoard = async (whoi) => {
  const who = users[whoi];
  await stdlib.balanceOf(who);
  const contract = await who.contract(backend, deployedContract.getInfo());
  const board = await contract.apis.BluePlayer.getBoard();
  console.log("---------");
  console.log(board);
  console.log("---------");
};

const timesup = async (whoi) => {
  console.log("I think time is up");
  const who = users[whoi];
  await stdlib.balanceOf(who);
  const contract = await who.contract(backend, deployedContract.getInfo());
  await contract.apis.BluePlayer.timesUp();
};

await acceptGame(B);
await acceptGame(R);

await getBoard(B);
// await makeMove(1, 11, 11);
// await willError(() => makeMove(1, 11, 2));
// await rsvp(0);
// await rsvp(1);
// await rsvp(2);
// await rsvp(4);
// await willError(() => rsvp(4));
// await checkin(4);
// await checkin(0);
// await willError(() => checkin(3));
// await checkin(2);
// await willError(() => checkin(2));

console.log("We're gonna wait for the deadline");
await stdlib.wait(deadline);

await timesup(R);

for (const who of users) {
  console.warn(
    stdlib.formatAddress(who),
    "has",
    stdlib.formatCurrency(await stdlib.balanceOf(who))
  );
}
