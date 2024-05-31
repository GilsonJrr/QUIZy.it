import styled, { css } from "styled-components";
import { FaCamera } from "react-icons/fa";

type Props = { width?: string; viewMode?: boolean; file?: boolean };

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: ${({ viewMode }) => (viewMode ? "row" : "column")};
  gap: 4px;
  position: relative;
  align-items: ${({ viewMode }) => (viewMode ? "center" : "auto")};
  justify-content: ${({ viewMode }) => (viewMode ? "center" : "auto")};
  width: 100%;
  @media screen and (min-width: 900px) {
    width: ${({ width }) => width || "100%"};
  }
`;

export const ContainerStyle = css<Props>`
  border-radius: 10px;
  font-size: 1.4rem;
  padding: 10px;
  border: ${({ viewMode }) => (viewMode ? 0 : 1)}px solid
    ${({ theme }) => theme.colors.main.default};
  outline: none;
  background-color: ${({ theme }) => theme.colors.background.highlight};
  width: 100%;
`;

export const Input = styled.input<Props>`
  ${ContainerStyle}

  display: ${({ file }) => (file ? "none" : "flex")};
`;

export const Error = styled.p`
  position: absolute;
  top: 100%;
  margin-top: 3px;
  font-size: 0.8rem;
  color: red;
`;

export const LoadingContainer = styled.div<Props>`
  ${ContainerStyle}
  background-color: ${({ theme }) => theme.colors.main.default};

  padding: 15px;
`;

export const LabelButton = styled.label<Props>`
  ${ContainerStyle}

  background-color: ${({ theme }) => theme.colors.main.default};
  text-align: center;
  cursor: pointer;
`;

export const IconButton = styled.label<Props>`
  background-color: ${({ theme }) => theme.colors.main.default};
  text-align: center;
  cursor: pointer;
  border-radius: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Camera = styled(FaCamera)`
  color: ${({ theme }) => theme.colors.background.default};
`;
