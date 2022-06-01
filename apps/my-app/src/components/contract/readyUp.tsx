import { useContext, useState } from "react";
import { WalletContext } from "../../contexts/walletContext";

const ReadyUp = () => {
  const { acceptGame, gameAccepted, usedQuery } = useContext(WalletContext);

  const [loading, setLoading] = useState(false);

  const joinGame = async () => {
    if (gameAccepted) return;
    setLoading(true);
    try {
      await acceptGame();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <p>Before the game starts, you'll have to ready up.</p>
      {loading ? (
        <p>
          <b>Go to your wallet and confirm the transaction!</b>
        </p>
      ) : (
        <button onClick={() => joinGame()}>Join Game!</button>
      )}

      <p>You'll be playing as {usedQuery ? "Red" : "Blue"}</p>
    </div>
  );
};

export default ReadyUp;
