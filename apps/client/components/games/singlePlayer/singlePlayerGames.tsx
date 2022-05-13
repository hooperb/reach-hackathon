import { Text, Flex, Box } from "@chakra-ui/react";

import TetrisIcon from "../../animations/tetrisIcon";
import HeaderBox from "../../generic/headerBox";

import Tetris from "./tetris";

const SinglePlayerGames = () => {
  const test = true;
  return (
    <Flex margin="8px" direction="column">
      <HeaderBox text="Single Player Games" />
      <Flex direction="column">
        <Box>
          <TetrisIcon />
        </Box>
        <Tetris />
      </Flex>
    </Flex>
  );
};

export default SinglePlayerGames;
