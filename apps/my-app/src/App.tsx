import "./App.css";
import Board from "./components/Board";
import WalletConnection from "./components/WalletConnection";

import { WalletContextProvider } from "./contexts/walletContext";

function App() {
  return (
    <WalletContextProvider>
      <div className="App">
        <div className="Game">
          <WalletConnection />
          <Board />
        </div>
      </div>
    </WalletContextProvider>
  );
}

export default App;
