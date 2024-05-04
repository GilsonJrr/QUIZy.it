import React from "react";
import { useModalContext } from "./modalContext";

const Modal = () => {
  const { modalContent, modal } = useModalContext();

  if (!modal) return null;

  return <>{modalContent}</>;
};

export default Modal;
