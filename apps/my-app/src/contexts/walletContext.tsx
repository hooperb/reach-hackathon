import React, { ReactChild, useState, createContext, useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import { IInternalEvent } from "@walletconnect/types";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { IAppState, INITIAL_STATE } from "../constants/walletTypes";

import { loadStdlib } from "@reach-sh/stdlib";
import { ALGO_WalletConnect as WalletConnect_ALGO } from "@reach-sh/stdlib";

// the contract
import * as backend from "../contracts/index.main.mjs";

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
  deployContract: () => Promise<void>;
  contractAddress?: string;
  readyToGo: boolean;
  gameAccepted: boolean;
  acceptGame: () => Promise<void>;
  usedQuery: boolean;
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
  const [readyToGo, setReadyToGo] = useState(false);
  const [usedQuery, setUsedQuery] = useState(false);
  const [gameAccepted, setGameAccepted] = useState(false);

  const [contractInstance, setContractInstance] = useState<any>();

  const makeMove = async (x: number, y: number) => {
    if (!userAccount) return;
    const contract = userAccount.contract(backend);
    await contract.safeApis.BluePlayer.makeMove(x, y);
  };

  const acceptGame = async () => {
    if (!userAccount || !contractAddress) return;
    try {
      const parsed = JSON.parse(contractAddress);
      const contract = userAccount.contract(backend, parsed);

      console.log(contractInstance);

      try {
        console.log("about to set");
        await stdlib.balanceOf(userAccount);
        console.log(await contract.views.Reader.getBoard());
        const test = !usedQuery
          ? await contract.apis.BluePlayer.acceptGame()
          : await contract.apis.RedPlayer.acceptGame();
        console.log(test);
        console.log("getting here");
        setGameAccepted(true);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(usedQuery);
    console.log(contractInstance);
    const search = window.location.search;
    if (!search) return;
    const contractString = `{ "type": "BigNumber", "hex": "${search.substring(
      6,
      search.length
    )}" }`;
    setUsedQuery(true);
    setContractAddress(contractString);
  }, []);

  useEffect(() => {
    setInterval(async () => {
      if (!contractAddress || !userAccount) return;
      const parsed = JSON.parse(contractAddress);
      const contract = userAccount.contract(backend, parsed);
      try {
        const ready = await contract.views.Reader.readyToPlay();
        console.log(ready);
        if (ready[1]) {
          console.log("setting ready!");
          setReadyToGo(true);
        }
      } catch (err) {
        console.log(err);
      }
    }, 4000);
  }, [gameAccepted]);

  // useEffect(() => {
  //   const contractString = '{ "type": "BigNumber", "hex": "0x058bcd1d" }';
  //   setContractAddress(contractString);
  // }, [contractAddress]);

  const deployContract = async () => {
    if (contractAddress) return;
    const contract = userAccount.contract(backend);
    try {
      const test = await contract.p.Admin({
        deadline: 100,
        price: stdlib.parseCurrency(5),
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
    setContractInstance(contract);
    const contractInfo = await contract.getInfo();
    setContractAddress(JSON.stringify(contractInfo, null, 2));
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
    const existingContract = JSON.parse(`{
      "type": "BigNumber",
      "hex": "0x058b0b17"
    }`);

    const redContract = await userAccount.contract(backend, existingContract);
    const board = await redContract.views.Reader.getBoard();
    setContractBoard(board[1]);
  };

  const connectWallet = async () => {
    const bridge = "https://bridge.walletconnect.org";
    console.log("gere");
    const instance = new WalletConnect({
      bridge,
      qrcodeModal: QRCodeModal,
    });
    const session = await instance.connect();
    const acc = await stdlib.connectAccount({ addr: session.accounts[0] });
    setUserAccount(acc);
    setWalletState({ ...walletState, connector: instance });
    instance.on("session_update", async (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      await onSessionUpdate(accounts);
    });

    instance.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      onConnect(payload);
    });

    instance.on("disconnect", (error, payload) => {
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
        usedQuery,
        gameAccepted,
        acceptGame,
        readyToGo,
        contractAddress,
        deployContract,
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
