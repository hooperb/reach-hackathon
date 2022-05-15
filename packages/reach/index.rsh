"reach 0.1";
"use strict";

export const main = Reach.App(() => {
	const BasePlayerMechanics = {
		placeTile: Fun([UInt, UInt], Bool),
		checkMate: Fun([], Bool),
		gamesOver: Fun([], Bool),
	};

	const D = Participant("Deployer", {
		// ...BasePlayerMechanics,
		price: UInt,
		deadline: UInt,
		creator: Address,
		ready: Fun([], Null),
	});

	const C = API("Challenger", {
		...BasePlayerMechanics,
		iAcceptGoodSir: Fun([], Bool),
	});

	const A = API("Acceptee", {
		...BasePlayerMechanics,
		iAcceptGoodSir: Fun([], Bool),
	});

	init();

	D.only(() => {
		const price = declassify(interact.price);
		const deadline = declassify(interact.deadline);
		const creator = declassify(interact.creator);
	});

	D.publish(price, deadline, creator);
	commit();
	D.publish();
	D.interact.ready(); // a flag that returns when the contract is succesfully created

	const deadlineBlock = relativeTime(deadline);

	// Board data structure
	// 5 | 0 0 0 0 0 0 0 0
	// 4 | 0 0 0 0 0 0 0 0
	// 3 | 0 0 0 0 0 0 0 0
	// 2 | 0 0 0 0 0 0 0 0
	// 1 | 0 0 0 0 0 0 0 0
	// 0 | 0 0 0 0 0 0 0 0
	//    ----------------
	//     0 1 2 3 4 5 6 7
	// const board = Array(Array(Null, 8), 6);

	// winner = R, Y or D => game over, record whos turn it is too
	// array(UInt, [0, 0, 0, 0, 0, 0, 0]);
	const [winner, turn, board] = parallelReduce([
		"",
		"R",
		array(UInt, ["", "", "", ""]),
	])
		.invariant(
			balance() == price * 2 // can only ever be wager * 2
		)
		.while(polyEq(winner, ""))
		// D is RED
		.api_(C.placeTile, (x, y) => {
			// check its d turn
			check(turn == "R");
			// check valid move
			check(x >= 0 || x <= 5 || y >= 0 || y <= 7, "in bounds");
			if (y != 0) {
				check(
					!polyEq(board[x][y - 1], Null),
					"needs to be something to place on top of"
				);
			}
			check(polyEq(board[x][y], Null), "theres not a tile there already");

			return [
				0,
				(k) => {
					k(true); // returns true to the user
					board[x][y] = "R";
					turn = "Y";
				},
			];
		})
		// A is YELLOW
		.api_(A.placeTile, (x, y) => {
			// check its d turn
			check(turn == "Y");
			// check valid move
			check(x >= 0 || x <= 5 || y >= 0 || y <= 7, "in bounds");
			if (y != 0) {
				check(
					!polyEq(board[x][y - 1], Null),
					"needs to be something to place on top of"
				);
			}
			check(polyEq(board[x][y], Null), "theres not a tile there already");

			return [
				0,
				(k) => {
					k(true); // returns true to the user
					board[x][y] = "Y";
					turn = "R";
				},
			];
		})
		.timeout(deadlineBlock, () => {
			const [[], k] = call(C.gamesOver);
			k(true);
			return [false, howMany];
		});
	commit();
	exit();
});
