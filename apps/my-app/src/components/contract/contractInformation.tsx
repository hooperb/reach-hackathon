import ConnectionMessage from "./connectionMessage";
import DeployContract from "./deployContract";
import InviteUser from "./inviteUser";
import ReadyUp from "./readyUp";

interface ContractInformationProps {
  contractAddress?: string;
  usedQuery: boolean;
}

const ContractInformation = ({
  contractAddress,
  usedQuery,
}: ContractInformationProps) => {
  return (
    <div>
      {contractAddress ? (
        <>
          <ConnectionMessage
            usedQuery={usedQuery}
            contractAddress={contractAddress}
          />
          {!usedQuery && <InviteUser contractAddress={contractAddress} />}
          <ReadyUp />
        </>
      ) : (
        <DeployContract />
      )}
    </div>
  );
};

export default ContractInformation;
