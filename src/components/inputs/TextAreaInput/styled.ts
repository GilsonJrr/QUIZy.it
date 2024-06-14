import styled from "styled-components";

type Props = {
  height?: string;
  width?: string;
  fontSize?: string;
};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: ${({ width }) => width || "100%"};
  flex: 1;
`;

export const Textarea = styled.textarea<Props>`
  flex: 1;
  border-radius: 10px;
  font-size: ${({ fontSize }) => fontSize};
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  height: ${({ height }) => height};
  resize: none;
  background-color: ${({ theme }) => theme.colors.background.highlight};
  outline: none;
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Error = styled.p`
  position: absolute;
  top: 100%;
  margin-top: 3px;
  font-size: 0.8rem;
  color: red;
`;
