import styled, { keyframes } from "styled-components";

type typeProps = "error" | "success" | "warning" | "default";
type Props = { type?: typeProps };

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0);
`;

export const Container = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100000;
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

export const Content = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.default};
  position: absolute;
  padding: 20px;
  display: flex;
  gap: 15px;
  animation: ${fadeIn} 0.2s ease-in-out;
  width: 100vw;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
  justify-content: space-between;
  @media screen and (min-width: 600px) {
    border: 1px solid ${({ theme }) => theme.colors.main.default};
    border-radius: 20px;
    top: 5px;
    max-width: 25vw;
  }
`;

export const IconContainer = styled.div``;

export const TextContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CloseContainer = styled.div``;

export const Message = styled.p``;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 14px;
`;
