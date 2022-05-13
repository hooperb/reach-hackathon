import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { useState } from "react";
import { GameContext } from "../../contexts/gameContext";

interface GameTileProps {
  name: string;
}

const GameTile = ({ name }: GameTileProps) => {
  const [test, setTest] = useState(false);
  const { setGame, game } = useContext(GameContext);

  console.log(setGame);
  return (
    <Button className="retro" width="150px" onClick={() => setGame(name)}>
      {name}
    </Button>
  );
};

export default GameTile;
