import React from "react";
import * as Styled from "./styled";
import { useModalContext } from "./modalContext";

const Modal = () => {
  const { modalContent, handleModal, modal } = useModalContext();

  //TODO: atualizar o handleModal com stop propagation

  if (!modal) return null;

  return (
    <Styled.ModalBackground onClick={() => handleModal("")}>
      {modalContent}
    </Styled.ModalBackground>
  );
};

export default Modal;
