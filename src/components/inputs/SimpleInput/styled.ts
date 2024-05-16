import styled from "styled-components";

type Props = { width?: string; viewMode?: boolean };

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: ${({ viewMode }) => (viewMode ? "row" : "column")};
  gap: 4px;
  position: relative;
  align-items: ${({ viewMode }) => (viewMode ? "center" : "auto")};
  justify-content: ${({ viewMode }) => (viewMode ? "center" : "auto")};
  width: ${({ width }) => width || "100%"};
`;

export const Label = styled.label<Props>`
  font-weight: 600;
  font-size: 1.1rem;
`;

export const Input = styled.input<Props>`
  border-radius: 10px;
  font-size: 1.4rem;
  padding: 10px;
  border: ${({ viewMode }) => (viewMode ? 0 : 1)}px solid
    ${({ theme }) => theme.colors.main.default};
  outline: none;
`;

export const Error = styled.p`
  position: absolute;
  top: 100%;
  margin-top: 3px;
  font-size: 0.8rem;
  color: red;
`;
