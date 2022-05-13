import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import App from "../components/app/App";
import GlobalStyles from "../components/globalStyle/globalStyle";
import { GameContextProvider } from "../contexts/gameContext";
import { WalletContextProvider } from "../contexts/walletContext";

const Web = () => (
  <ChakraProvider>
    <WalletContextProvider>
      <GameContextProvider>
        <>
          <GlobalStyles />
          <App />
        </>
      </GameContextProvider>
    </WalletContextProvider>
  </ChakraProvider>
);

export default Web;
