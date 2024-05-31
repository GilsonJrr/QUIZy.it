import styled from "styled-components";

type Props = {
  progress?: number;
  radius?: number;
  color?: string;
  progressNull?: boolean;
};

export const ProgressBar = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.default};
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
  min-width: 12%;
  width: ${({ progress }) => (progress ? progress : 0)}%;
  height: 100%;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main.default};
  color: ${({ theme }) => theme.colors.background.default};
  padding: ${({ progress }) =>
    progress && progress < 20 ? "0 0 0 5px" : "0 0 0 15px"};
  align-items: center;
  @media screen and (min-width: 600px) {
    min-width: 16%;
  }
`;

export const Empty = styled.div<Props>`
  padding: 0 0 0 10px;
  color: ${({ theme }) => theme.colors.main.default};
`;
