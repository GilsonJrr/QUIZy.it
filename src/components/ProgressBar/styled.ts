import styled from "styled-components";

type Props = { progress?: number; radius?: number; color?: string };

export const ProgressBar = styled.div<Props>`
  background-color: #ffffff;
  border-radius: ${({ radius }) => radius}px;
  width: 100%;
  height: 30px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

export const ProgressBarFill = styled.div<Props>`
  position: absolute;
  top: 0;
  border-radius: ${({ radius }) => radius}px;
  display: ${({ progress }) => (progress ? "flex" : "none")};
  width: ${({ progress }) => (progress ? progress : 0)}%;
  height: 100%;
  background-color: ${({ color }) => (color ? color : "#4a4747")};
  color: #ffff;
  padding: 0 15px;
  align-items: center;
`;
