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
        <>
          Address: {walletState.address}
          <button onClick={() => disconnect()}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
