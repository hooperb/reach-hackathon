import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const [PlayerOneAccount, PlayerTwoAccount] = await stdlib.newTestAccounts(
	2,
	startingBalance
);

const playerOneContract = PlayerOneAccount.contract(backend);
const playerTwoContract = PlayerTwoAccount.contract(
	backend,
	playerOneContract.getInfo()
);

await Promise.all([
	backend.PlayerOne(playerOneContract, {
		...stdlib.hasRandom,
	}),
	backend.PlayerTwo(playerTwoContract, {
		...stdlib.hasRandom,
	}),
]);
