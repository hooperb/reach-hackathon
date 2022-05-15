import { useEffect, useState } from "react";
import checkWinner from "../helpers/checkWinner";
import Slat from "./Slat";

const Board = () => {
	const emptyBoard = new Array(7).fill(new Array(6).fill(null));
	const [board, setBoard] = useState(emptyBoard);
	const [playerTurn, setPlayerTurn] = useState("Red");
	const [gameSelected, setGameSelected] = useState(false);
	const [winner, setWinner] = useState("");

	// called when a gamemode is selected
	const startGame = () => {
		setGameSelected(true);
		setBoard(emptyBoard);
	};

	const makeMove = (slatID: number) => {
		const boardCopy = board.map((arr) => {
			return arr.slice();
		});
		if (boardCopy[slatID].indexOf(null) !== -1) {
			const newSlat = boardCopy[slatID].reverse();
			newSlat[newSlat.indexOf(null)] = playerTurn;
			newSlat.reverse();
			setPlayerTurn(playerTurn === "Red" ? "Blue" : "Red");
			setBoard(boardCopy);
		}
	};

	const handleClick = (slatID: number) => {
		if (winner === "") {
			makeMove(slatID);
		}
	};

	useEffect(() => {
		const isWinner = checkWinner(board);
		if (isWinner !== winner) {
			setWinner(isWinner);
		}
	}, [board, winner]);

	return (
		<>
			{gameSelected &&
				[...Array(board.length)].map((x, i) => (
					<div key={i} className="Board">
						<Slat key={i} holes={board[i]} handleClick={() => handleClick(i)} />
					</div>
				))}

			{winner !== "" && (
				<div>They've done it!! {winner} has taken this one home!</div>
			)}
			<div>
				<button onClick={() => startGame()}>Start Game!</button>
			</div>
		</>
	);
};

export default Board;
