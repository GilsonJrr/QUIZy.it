import styled, { keyframes } from "styled-components";

type Props = {};

const bounce = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-5px) translateX(2px);
  }
  50% {
    transform: translateY(0) translateX(0);
  }
  75% {
    transform: translateY(-5px) translateX(-2px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
`;

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Loader = styled.img`
  width: 80px;
  height: 80px;
  background-size: cover;
  animation: ${bounce} 3s ease-in-out infinite;
`;

export const LoadingText = styled.h2`
  font-size: 1.3rem;
`;
