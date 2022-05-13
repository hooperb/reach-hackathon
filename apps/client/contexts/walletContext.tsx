import { createContext, ReactChild, useState } from "react";

export interface IWalletContext {
  toggleModal: () => void;
  modalOpen: boolean;
}

export const WalletContext = createContext({} as IWalletContext);

export const WalletContextProvider = ({
  children,
}: {
  children: ReactChild;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <WalletContext.Provider value={{ modalOpen, toggleModal }}>
      {children}
    </WalletContext.Provider>
  );
};
