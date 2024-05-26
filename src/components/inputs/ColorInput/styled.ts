import styled, { css } from "styled-components";

type Props = { display?: boolean; color?: string };

export const Container = styled.div<Props>`
  position: relative;
  flex-direction: column;
  display: flex;
  width: 100%;
`;

export const TopArrow = css`
  &::after {
    content: "";
    position: absolute;
    left: calc(50% - 15px);
    bottom: 100%;
    border-top: 15px solid transparent;
    border-bottom: 15px solid ${({ theme }) => theme.colors.main.default};
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }

  &::before {
    content: "";
    position: absolute;
    left: calc(50% - 15px);
    bottom: 99.2%;
    border-top: 15px solid transparent;
    border-bottom: 14px solid ${({ theme }) => theme.colors.background.default};
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    z-index: 10000;
  }
`;

export const PickerContainer = styled.div<Props>`
  display: ${({ display }) => (display ? "flex" : "none")};
  position: absolute;
  z-index: 1000;
  top: 100%;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 0 auto;
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  padding: 10px;
  border-radius: 10px;

  ${TopArrow}
`;

export const CurrentColor = styled.div<Props>`
  background-color: ${({ color }) => color};
  height: 25px;
  width: 25px;
  border-radius: 100%;
  margin: 0 0 0 10px;
`;
