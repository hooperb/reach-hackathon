import { useEffect, useState, useContext } from "react";
import { WalletContext } from "../contexts/walletContext";
import checkWinner from "../helpers/checkWinner";
import Slat from "./Slat";

import { createBrowserHistory } from "history";
import ContractInformation from "./contract/contractInformation";
const history = createBrowserHistory();

const Board = () => {
  const emptyBoard = new Array(7).fill(new Array(6).fill("0"));
  const [board, setBoard] = useState(emptyBoard);
  const [playerTurn, setPlayerTurn] = useState("Red");
  const [gameSelected, setGameSelected] = useState(false);
  const [winner, setWinner] = useState("");

  const {
    walletState,
    connectToContract,
    contractBoard,
    contractAddress,
    usedQuery,
  } = useContext(WalletContext);

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
    <div className="Game">
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
          <>
            <ContractInformation
              contractAddress={contractAddress}
              usedQuery={usedQuery}
            />
          </>
        ) : (
          <>
            {contractAddress && <p>You've been invited to a game!</p>}
            <p>Connect your wallet to get started!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
