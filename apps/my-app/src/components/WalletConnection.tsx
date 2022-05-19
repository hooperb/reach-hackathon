import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { IInternalEvent } from "@walletconnect/types";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { useState } from "react";
import { IAssetData } from "../helpers/types";
import { apiGetAccountAssets, ChainType } from "../helpers/api";
import { render } from "@testing-library/react";

interface IResult {
	method: string;
	body: Array<
		Array<{
			txID: string;
			signingAddress?: string;
			signature: string;
		} | null>
	>;
}

interface IAppState {
	connector: WalletConnect | null;
	fetching: boolean;
	connected: boolean;
	showModal: boolean;
	pendingRequest: boolean;
	signedTxns: Uint8Array[][] | null;
	pendingSubmissions: Array<number | Error>;
	uri: string;
	accounts: string[];
	address: string;
	result: IResult | null;
	chain: ChainType;
	assets: IAssetData[];
}

const INITIAL_STATE: IAppState = {
	connector: null,
	fetching: false,
	connected: false,
	showModal: false,
	pendingRequest: false,
	signedTxns: null,
	pendingSubmissions: [],
	uri: "",
	accounts: [],
	address: "",
	result: null,
	chain: ChainType.TestNet,
	assets: [],
};

const WalletConnection = () => {
	const [walletConnected, setWalletConnected] = useState(false);
	const [walletState, setWalletState] = useState<IAppState>(INITIAL_STATE);
	const [accounts, setAccounts] = useState([]);
	const [address, setAddress] = useState<string>();

	const walletConnectInit = async () => {
		const bridge = "https://bridge.walletconnect.org";
		const instance = new WalletConnect({
			bridge,
			qrcodeModal: QRCodeModal,
		});

		await instance.connect();
		setWalletConnected(true);
		// await setWalletState({ ...walletState, connector: instance });

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
			console.log("connected = true");
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
		setWalletConnected(false);
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

	const deployContract = async () => {
		const {} = walletState;
	};

	const getAccountAssets = async () => {
		const { address, chain } = walletState;
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
		<div>
			{walletConnected ? (
				<>
					Address: {walletState.address}
					<button onClick={() => onDisconnect()}>Disconnect Wallet</button>
				</>
			) : (
				<button onClick={() => walletConnectInit()}>
					Connect My Algo Wallet
				</button>
			)}
		</div>
	);
};

export default WalletConnection;
