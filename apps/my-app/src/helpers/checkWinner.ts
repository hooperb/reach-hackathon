const checkLine = (
	a: string | undefined | null,
	b: string | undefined | null,
	c: string | undefined | null,
	d: string | undefined | null
) => {
	return a !== null && a === b && a === c && a === d;
};

const checkWinner = (board: Array<Array<undefined | string | null>>) => {
	// first
	for (let c = 0; c < 7; c++) {
		for (let r = 0; r < 4; r++) {
			if (
				checkLine(
					board[c][r],
					board[c][r + 1],
					board[c][r + 2],
					board[c][r + 3]
				)
			) {
				return `${board[c][r]} wins!`;
			}
		}
	}
	// second
	for (let r = 0; r < 6; r++) {
		for (let c = 0; c < 4; c++) {
			if (
				checkLine(
					board[c][r],
					board[c + 1][r],
					board[c + 2][r],
					board[c + 3][r]
				)
			) {
				return `${board[c][r]} wins!`;
			}
		}
	}

	// third
	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 4; c++) {
			if (
				checkLine(
					board[c][r],
					board[c + 1][r + 1],
					board[c + 2][r + 2],
					board[c + 3][r + 3]
				)
			) {
				return `${board[c][r]} wins!`;
			}
		}
	}

	// fourth
	for (let r = 0; r < 4; r++) {
		for (let c = 3; c < 6; c++) {
			if (
				checkLine(
					board[c][r],
					board[c - 1][r + 1],
					board[c - 2][r + 2],
					board[c - 3][r + 3]
				)
			) {
				return `${board[c][r]} wins!`;
			}
		}
	}

	return "";
};

export default checkWinner;
