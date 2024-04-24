import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";

type ModalProps = {
  children: ReactNode | ReactNode[];
  action: () => void;
  modalType: string;
  showModal: boolean;
  position: "top" | "bottom" | "center";
};

const Modal: FC<ModalProps> = ({
  children,
  action,
  modalType,
  showModal,
  position,
}) => {
  return (
    <Styled.ModalBackground onClick={action} showModal={showModal}>
      <Styled.Modal modalType={modalType} position={position}>
        {children}
      </Styled.Modal>
    </Styled.ModalBackground>
  );
};

export default Modal;
