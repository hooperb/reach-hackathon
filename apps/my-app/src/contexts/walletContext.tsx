import React, { ReactChild, useState, createContext } from "react";
import WalletConnect from "@walletconnect/client";
import { IInternalEvent } from "@walletconnect/types";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { IAppState, INITIAL_STATE } from "../constants/walletTypes";

import { loadStdlib } from "@reach-sh/stdlib";
import { ALGO_WalletConnect as WalletConnect_ALGO } from "@reach-sh/stdlib";

// the contract
import * as backend from "../build/index.main.mjs";

const stdlib = loadStdlib("ALGO");
stdlib.setWalletFallback(
  stdlib.walletFallback({
    providerEnv: "TestNet",
    WalletConnect: WalletConnect_ALGO,
  })
);

export interface IWarningContext {
  onDisconnect: () => Promise<void>;
  connectWallet: () => Promise<void>;
  userAccount: any;
  walletState: IAppState;
  connectToContract: () => void;
  contractBoard?: Array<Array<string>>;
  setContractBoard: (cBoard: Array<Array<string>>) => void;
}

export const WalletContext = createContext({} as IWarningContext);

export const WalletContextProvider = ({
  children,
}: {
  children: ReactChild;
}) => {
  const [walletState, setWalletState] = useState<IAppState>(INITIAL_STATE);
  const [userAccount, setUserAccount] = useState<any>();

  const [contractBoard, setContractBoard] = useState<Array<Array<string>>>();

  const [contractAddress, setContractAddress] = useState<string>();

  const makeMove = async (x: number, y: number) => {
    if (!userAccount) return;
    const contract = userAccount.contract(backend);
    await contract.safeApis.BluePlayer.makeMove(x, y);
  };

  const connectToContract = async () => {
    if (!userAccount) return;
    const contract = userAccount.contract(backend);
    // deploy contract
    const deploy = false;
    if (deploy) {
      try {
        const test = await contract.p.Admin({
          deadline: 100,
          price: stdlib.parseCurrency(1),
          ready: () => {
            console.log("The contract is ready");
            throw 42;
          },
        });
        console.log(test);
      } catch (err) {
        if (err !== 42) {
          console.log(err);
        }
      }

      const contractInfo = await contract.getInfo();
      console.log("Contract string:");
      console.log(JSON.stringify(contractInfo, null, 2));
    }
    // const redContract = await userAccount.contract(backend, contractInfo);
    // console.log(redContract);
    // const testRedCommit = await await contract.safeApis.BluePlayer.acceptGame();
    // setContractAddress(await contract.getInfo()._hex);

    const existingContract = JSON.parse(`{
      "type": "BigNumber",
      "hex": "0x058b0b17"
    }`);

    const redContract = await userAccount.contract(backend, existingContract);
    console.log(redContract);

    // const testRedCommit = await redContract.safeApis.RedPlayer.acceptGame();
    const board = await redContract.views.Reader.getBoard();

    console.log(board[1]);
    setContractBoard(board[1]);

    // console.log(testRedCommit);
  };

  const connectWallet = async () => {
    const bridge = "https://bridge.walletconnect.org";
    const instance = new WalletConnect({
      bridge,
      qrcodeModal: QRCodeModal,
    });
    const session = await instance.connect();
    const acc = await stdlib.connectAccount({ addr: session.accounts[0] });
    setUserAccount(acc);
    setWalletState({ ...walletState, connector: instance });
    instance.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`);
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      await onSessionUpdate(accounts);
    });

    instance.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);

      if (error) {
        throw error;
      }
      onConnect(payload);
    });

    instance.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);
      if (error) {
        throw error;
      }
      onDisconnect();
    });

    if (instance.connected) {
      const { accounts } = instance;
      const address = accounts[0];
      walletState.connected = true;
      walletState.accounts = accounts;
      walletState.address = address;
      setWalletState(walletState);
      onSessionUpdate(accounts);
    }
    walletState.connector = instance;
    setWalletState(walletState);
    console.log("updated state");
  };
  const onConnect = async (payload: IInternalEvent) => {
    const { accounts } = payload.params[0];
    const address = accounts[0];
    walletState.connected = true;
    walletState.accounts = accounts;
    walletState.address = address;
    setWalletState(walletState);
    await getAccountAssets();
  };

  const onDisconnect = async () => {
    setWalletState(INITIAL_STATE);
  };

  const onSessionUpdate = async (accounts: string[]) => {
    const address = accounts[0];
    walletState.accounts = accounts;
    walletState.address = address;
    walletState.connected = true;

    setWalletState(walletState);
    await getAccountAssets();
  };

  const getAccountAssets = async () => {
    const { address } = walletState;
    walletState.fetching = true;
    setWalletState(walletState);
    try {
      // const assets = await apiGetAccountAssets(chain, address);
      walletState.connected = true;
      walletState.fetching = false;
      walletState.address = address;
      setWalletState(walletState);
    } catch (error) {
      console.error(error);
      walletState.fetching = true;
      setWalletState(walletState);
    }
  };
  return (
    <WalletContext.Provider
      value={{
        userAccount,
        onDisconnect,
        connectWallet,
        walletState,
        connectToContract,
        contractBoard,
        setContractBoard,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
