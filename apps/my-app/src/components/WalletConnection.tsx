import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../contexts/walletContext";

const WalletConnection = () => {
  const [loading, setLoading] = useState(false);
  const { connectWallet, walletState, onDisconnect } =
    useContext(WalletContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const connect = async () => {
    setLoading(true);
    await connectWallet();
    setLoading(false);
  };

  const disconnect = async () => {
    setLoading(true);
    onDisconnect();
    setLoading(false);
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <div>
      {walletState.connected ? (
        <div className="walletDetails">
          <p>Address: {walletState.address}</p>
          <button onClick={() => disconnect()}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
