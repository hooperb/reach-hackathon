import { useContext, useState } from "react";
import { WalletContext } from "../../contexts/walletContext";

const DeployContract = () => {
  const { deployContract } = useContext(WalletContext);
  const deployContractInstance = async () => {
    setDeployingContract(true);
    await deployContract();
    setDeployingContract(false);
  };

  const [deployingContract, setDeployingContract] = useState(false);

  return deployingContract ? (
    <p>Deploying! Go to your wallet and confirm the transaction</p>
  ) : (
    <button onClick={() => deployContractInstance()}>Deploy Contract!</button>
  );
};

export default DeployContract;
