interface InviteUserProps {
  contractAddress: string;
}

const InviteUser = ({ contractAddress }: InviteUserProps) => {
  return (
    <>
      <p>
        Send this URL:{" "}
        <b>
          {window.location.href}?game=
          {JSON.parse(contractAddress).hex}
        </b>
      </p>
      <p>To the other player to get started!</p>
    </>
  );
};
export default InviteUser;
