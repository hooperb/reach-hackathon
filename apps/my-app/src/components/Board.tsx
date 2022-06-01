import { useEffect, useState, useContext } from "react";
import { WalletContext } from "../contexts/walletContext";
import checkWinner from "../helpers/checkWinner";
import Slat from "./Slat";

const Board = () => {
  const emptyBoard = new Array(7).fill(new Array(6).fill("0"));
  const [board, setBoard] = useState(emptyBoard);
  const [playerTurn, setPlayerTurn] = useState("Red");
  const [gameSelected, setGameSelected] = useState(false);
  const [winner, setWinner] = useState("");

  const { walletState, connectToContract, contractBoard } =
    useContext(WalletContext);

  // called when a gamemode is selected
  const startGame = () => {
    connectToContract();
    // setGameSelected(true);
    if (contractBoard) {
      setBoard(contractBoard);
    }
    setGameSelected(true);
    //
  };

  const makeMove = (slatID: number) => {
    const boardCopy = board.map((arr) => {
      return arr.slice();
    });
    console.log("x coord");
    console.log(slatID);
    if (boardCopy[slatID].indexOf("0") !== -1) {
      // add makeMove function call here
      // check there's an empty cell in this row
      const newSlat = boardCopy[slatID].reverse(); // reverse the row
      newSlat[newSlat.indexOf("0")] = playerTurn; // add to first available slot
      console.log("y coord");
      console.log(newSlat.indexOf("0") - 1); // y coord
      boardCopy[slatID].reverse(); // reverse it back
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
            <Slat
              key={i}
              holes={board[i] === "0" ? undefined : board[i]}
              handleClick={() => handleClick(i)}
            />
          </div>
        ))}
      {winner !== "" && (
        <div>They've done it!! {winner} has taken this one home!</div>
      )}
      <div>
        {walletState.connected ? (
          <button onClick={() => startGame()}>Start Game!</button>
        ) : (
          <p>Connect your wallet to get started!</p>
        )}
      </div>
    </>
  );
};

export default Board;
