import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";

import { WalletContext } from "../../contexts/walletContext";

const WalletConnectController = () => {
  const { modalOpen, toggleModal } = useContext(WalletContext);
  return (
    <div className="wallet-connect">
      <Button className="retro" onClick={toggleModal}>
        Connect Wallet
      </Button>
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent className="retro">
          <p>Connect to algo with:</p>
          <Flex direction="column">
            <Button margin="8px">Pera Wallet</Button>
            <Button margin="8px">My Algo Wallet</Button>
            <Button margin="8px">Pera Wallet</Button>
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WalletConnectController;
