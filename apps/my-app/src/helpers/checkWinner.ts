const checkLine = (
  a: string | undefined | null,
  b: string | undefined | null,
  c: string | undefined | null,
  d: string | undefined | null
) => {
  return a != "0" && a !== null && a === b && a === c && a === d;
};

const inverter = (x: number) => {
  if (x == 0) {
    return 5;
  } else if (x == 1) {
    return 4;
  } else if (x == 2) {
    return 3;
  } else if (x == 3) {
    return 2;
  } else if (x == 4) {
    return 1;
  } else if (x == 5) {
    return 0;
  }
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
        console.log(`Column: c: ${c} r: ${inverter(r + 3)}`);
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
        console.log(`Row: x: ${c} y: ${inverter(r)}`);
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
        console.log(`left upward: c: ${c + 3} r: ${inverter(r + 3)}`);
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
        console.log(`right upward: c: ${c - 3} r: ${inverter(r + 3)}`);
        return `${board[c][r]} wins!`;
      }
    }
  }

  return "";
};

export default checkWinner;
