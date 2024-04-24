import styled from "styled-components";

type Props = {
  progress?: number;
  active?: boolean;
  buttonType?: "primary" | "secondary";
  modalType?: string;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 30px 10px 10px;
  background-color: #f5f6fa;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Coins = styled.div`
  background-color: #ffffff;
  padding: 5px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-weight: 800;
`;

export const Title = styled.h1`
  font-size: 20px;
`;

export const Close = styled.div`
  background-color: #ffffff;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  font-size: 10px;
  font-weight: 800;
`;

export const ProgressContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ProgressBar = styled.div`
  background-color: #ffffff;
  border-radius: 50px;
  width: 100%;
  height: 20px;
  position: relative;
`;

export const ProgressBarFill = styled.div<Props>`
  position: absolute;
  top: 0;
  border-radius: 50px;
  width: ${({ progress }) => progress}%;
  height: 20px;
  background-color: green;
`;

export const ProgressNumber = styled.h3``;

export const Question = styled.h3`
  text-align: center;
  color: blue;
`;

export const AnswerButton = styled.button<Props>`
  border: none;
  width: 90%;
  background-color: ${({ active }) => (active ? "green" : "#ffffff")};
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const AnswerIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6fa;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  line-height: 0;
  font-weight: 700;
`;

export const AnswerText = styled.h3<Props>`
  color: ${({ active }) => (!active ? "black" : "#ffffff")};
`;

export const ContinueButton = styled.button<Props>`
  border: none;
  background-color: ${({ buttonType }) =>
    buttonType === "primary" ? "green" : "#FFFFFF"};
  width: 90%;
  position: absolute;
  bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;

  color: ${({ buttonType }) =>
    buttonType === "primary" ? "#ffffff" : "#000000"};
  font-weight: 800;

  &:disabled {
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 10;
`;

export const Modal = styled.div<Props>`
  background-color: ${({ modalType }) =>
    modalType === "correct" ? "green" : "red"};
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 30%;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  color: #ffffff;
`;
