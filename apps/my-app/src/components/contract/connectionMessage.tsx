interface ConnectionMessageProps {
  usedQuery: boolean;
  contractAddress: string;
}

const ConnectionMessage = ({
  usedQuery,
  contractAddress,
}: ConnectionMessageProps) => {
  return usedQuery ? (
    <p>The contract has been deployed to: {contractAddress}</p>
  ) : (
    <>The contract your connecting to has been deployed to: {contractAddress}</>
  );
};

export default ConnectionMessage;
