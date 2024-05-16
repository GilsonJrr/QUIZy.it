import styled from "styled-components";

type Props = {
  progress?: number;
  radius?: number;
  color?: string;
  progressNull?: boolean;
};

export const ProgressBar = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ radius }) => radius}px;
  width: 100%;
  height: 30px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  display: flex;
  align-items: center;
`;

export const ProgressBarFill = styled.div<Props>`
  position: absolute;
  top: 0;
  border-radius: ${({ radius }) => radius}px;
  display: ${({ progress }) => (progress ? "flex" : "none")};
  width: ${({ progress }) => (progress ? progress : 0)}%;
  height: 100%;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main.default};
  color: ${({ theme }) => theme.colors.background.default};
  padding: 0 15px;
  align-items: center;
`;

export const Empty = styled.div<Props>`
  padding: 0 0 0 10px;
  color: ${({ theme }) => theme.colors.main.default};
`;
