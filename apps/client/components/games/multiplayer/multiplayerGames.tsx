import { Text, Flex, Box } from "@chakra-ui/react";
import ConnectFourIcon from "../../animations/connectFourIcon";

import HeaderBox from "../../generic/headerBox";

import ConnectFour from "./connectFour";

const MultiplayerGames = () => {
  const test = true;
  return (
    <Flex margin="8px" direction="column">
      <HeaderBox text="Multiplayer Games" />
      <Flex direction="column">
        <Box>
          <ConnectFourIcon />
        </Box>
        <ConnectFour />
      </Flex>
    </Flex>
  );
};

export default MultiplayerGames;
