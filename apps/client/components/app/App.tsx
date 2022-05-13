import { Box, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import JSPaint from "../animations/jspaint";
import Loading from "../animations/loading";
import SinglePlayerGames from "../games/singlePlayer/singlePlayerGames";
import MultiplayerGames from "../games/multiplayer/multiplayerGames";
import { GameContext } from "../../contexts/gameContext";
import WalletConnectController from "../wallet/walletConnectController";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { setGame, game } = useContext(GameContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="holder">
      <div className="thank-you">
        <p className="text">algrounds</p>
        <p className="text-small">cool background powered by jspaint</p>
      </div>
      <WalletConnectController />
      <div className="menu">
        <SinglePlayerGames />
        <Box marginTop="25px" />
        <MultiplayerGames />
      </div>
      {game && <div className="game-screen"></div>}

      <JSPaint />
    </div>
  );
};

export default App;
