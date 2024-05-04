import React, { createContext, ReactNode, useContext } from "react";
import useModal from "hooks/useModal";
import Modal from ".";

// Define types for context value
interface ModalContextType {
  modal: boolean;
  handleModal: (content: ReactNode | ReactNode[]) => void;
  modalContent: ReactNode;
}

// Create context with initial values
const ModalContext = createContext<ModalContextType>({
  modal: false,
  handleModal: () => {},
  modalContent: null,
});

// Define props type for ModalProvider
interface ModalProviderProps {
  children: ReactNode | ReactNode[];
}

// Define ModalProvider component
const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { modal, handleModal, modalContent } = useModal();
  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

// Create custom hook to use modal context
const useModalContext = () => useContext(ModalContext);

export { ModalProvider, useModalContext };
