import "./App.css";
import Board from "./components/Board";
import WalletConnection from "./components/WalletConnection";

import { WalletContextProvider } from "./contexts/walletContext";
import Title from "./components/Title";

function App() {
  return (
    <WalletContextProvider>
      <div className="App">
        <div className="Game">
          <Title />
          <WalletConnection />
          <Board />
        </div>
      </div>
    </WalletContextProvider>
  );
}

export default App;
