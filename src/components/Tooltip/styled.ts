import styled, { css } from "styled-components";

type Props = {
  showSelector?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  width?: string;
  hover?: boolean;
  disable?: boolean;
};

export const Container = styled.div<Props>`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || ""};
`;

export const Content = styled.div<Props>`
  display: flex;
  width: ${({ width }) => width || ""};
  align-items: center;
  justify-content: center;
  outline: ${({ hover, showSelector, disable }) =>
      disable ? "0" : hover && showSelector ? "1" : "0"}px
    solid ${({ theme }) => theme.colors.main.default};
  outline-offset: -1px;
  border-radius: 10px;
  transition: 0.3s ease-in-out all;
`;

export const TopArrow = css`
  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    border-top: 15px solid transparent;
    border-bottom: 15px solid ${({ theme }) => theme.colors.main.default};
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: calc(100% - 1px);
    border-top: 15px solid transparent;
    border-bottom: 14px solid ${({ theme }) => theme.colors.background.default};
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    z-index: 10000;
  }
`;

export const BottomArrow = css`
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    border-top: 15px solid ${({ theme }) => theme.colors.main.default};
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }

  &::before {
    content: "";
    position: absolute;
    top: 99%;
    border-top: 14px solid ${({ theme }) => theme.colors.background.default};
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    z-index: 10000;
  }
`;

export const RightArrow = css`
  &::after {
    content: "";
    position: absolute;
    right: 100%;
    top: 25px;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    border-right: 15px solid ${({ theme }) => theme.colors.main.default};
  }

  &::before {
    content: "";
    position: absolute;
    right: 99%;
    top: 25px;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    border-right: 15px solid ${({ theme }) => theme.colors.background.default};
    z-index: 10000;
  }
`;

export const FromTheTop = css`
  top: 100%;
  margin-top: 16px;
`;

export const FromTheBottom = css`
  bottom: 100%;
  margin-bottom: 15px;
`;

export const FromTheRight = css`
  left: 100%;
  top: -15px;
  margin-left: 18px;
`;

export const ToolTipInvisibleContainer = styled.div<Props>`
  display: ${({ showSelector }) => (showSelector ? "flex" : "none")};
  width: 150px;
  height: 100px;
  position: absolute;
  z-index: 1;
`;

export const ToolTipContent = styled.div<Props>`
  display: ${({ showSelector }) => (showSelector ? "flex" : "none")};
  position: absolute;
  flex-direction: column;
  z-index: 60000;
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: 10px;
  gap: 10px;
  align-items: center;
  transition: 0.3s ease-in-out all;
  -webkit-box-shadow: 0px 15px 27px 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 15px 27px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 15px 27px 1px rgba(0, 0, 0, 0.3);

  button {
    gap: 10px;
  }

  ${({ position }) =>
    position === "bottom"
      ? FromTheBottom
      : position === "top"
      ? FromTheTop
      : position === "right"
      ? FromTheRight
      : ""}

  ${({ position }) =>
    position === "bottom"
      ? BottomArrow
      : position === "top"
      ? TopArrow
      : position === "right"
      ? RightArrow
      : ""}
`;
