import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { useModalContext } from "./modalContext";

type ModalProps = {
  children?: ReactNode | ReactNode[];
  action?: () => void;
  modalType?: string;
  showModal?: boolean;
  position?: "top" | "bottom" | "center";
};

const Modal: FC<ModalProps> = ({
  children,
  action,
  modalType,
  showModal,
  position,
}) => {
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
