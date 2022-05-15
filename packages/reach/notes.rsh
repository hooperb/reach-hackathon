"reach 0.1";

// Game data structure

// 5 | 0 0 0 0 0 0 0 0
// 4 | 0 0 0 0 0 0 0 0
// 3 | 0 0 0 0 0 0 0 0
// 2 | 0 0 0 0 0 0 0 0
// 1 | 0 0 0 0 0 Y 0 0
// 0 | Y 0 0 0 Y R R R
//    ----------------
//     0 1 2 3 4 5 6 7

// can be expressed as:
// key is of type placement, {y: number, x: number}
// const gameBoard = [
//   {key: 00, value: Y},
//   {key: 04, value: Y},
//   {key: 05, value: R},
//   {key: 06, value: R},
//   {key: 07, value: R},
//   {key: 15, value: Y},
// ]

// const makeMove = (_placement, _colour) => {
//   // check all parameters to make sure move is legimate
//   require(isTurn(msg.sender), "Not your turn!!"));
//   require(gameBoard[placement] == 0, "This tile is filled");
//   if(placement.y != 0) {
//     require(gameBoard[_placement.y - 1, _placement.x] != 0, "Invalid move!")
//   }
//   // if it's made it here it's a valid move
//   gameBoard[placement] = _colour;
//   return true;
// }

export const main = Reach.App(() => {
	// Types
	const Placement = Object({
		x: UInt,
		y: UInt,
	});

	// Functions callable by user(s)
	const InitialiseGameFunctionality = {
		createGameInstance: Fun([], UInt),
	};
	const JoinGameFunctionality = {
		joinGameInstance: Fun([UInt], Bool),
	};

	const BasePlayerFunctionality = {
		getGameBoard: Fun([], Bytes(48)),
		makeMove: Fun([Placement], Bool),
		checkForWin: Fun([], Bool),
	};

	// Participants
	const PlayerOne = Participant("PlayerOne", {
		...InitialiseGameFunctionality,
		...BasePlayerFunctionality,
	});
	const PlayerTwo = Participant("PlayerTwo", {
		...JoinGameFunctionality,
		...BasePlayerFunctionality,
	});

	// The actual game board
	init();
	// The first one to publish deploys the contract
	PlayerOne.publish();
	commit();
	// The second one to publish always attaches
	PlayerTwo.publish();
	commit();

	exit();
});
