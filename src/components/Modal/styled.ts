import styled from "styled-components";

type Props = {
  modalType?: string;
  showModal?: boolean;
  position?: "top" | "bottom" | "center";
};

export const ModalBackground = styled.div<Props>`
  display: ${({ showModal }) => (showModal ? "flex" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 10;

  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div<Props>`
  background-color: ${({ modalType }) =>
    modalType === "correct" ? "green" : "red"};
  width: 100%;
  position: absolute;
  bottom: ${({ position }) => (position === "bottom" ? 0 : "auto")};
  top: ${({ position }) => (position === "top" ? 0 : "auto")};
  height: 30%;
  border-radius: ${({ position }) =>
    position === "bottom"
      ? "20px 20px 0 0"
      : position === "top"
      ? "0 0 20px 20px"
      : position === "center" && "20px"};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  color: #ffffff;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
