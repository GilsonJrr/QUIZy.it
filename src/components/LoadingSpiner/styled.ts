import styled, { keyframes } from "styled-components";

type Props = {
  size?: number;
  thinness?: number;
  color?: "light" | "dark";
};

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div<Props>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: ${({ thinness }) => thinness}px solid transparent;
  border-top-color: ${({ theme, color }) =>
    color === "light"
      ? theme.colors.background.default
      : theme.colors.main.default};
  border-left-color: ${({ theme, color }) =>
    color === "light"
      ? theme.colors.background.default
      : theme.colors.main.default};
  border-right-color: ${({ theme, color }) =>
    color === "light"
      ? theme.colors.background.default
      : theme.colors.main.default};
  animation: ${spinAnimation} 0.8s linear infinite;
`;
