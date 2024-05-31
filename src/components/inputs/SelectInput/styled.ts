import styled from "styled-components";

type Props = { width?: string };

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  position: relative;
  width: 100%;
  @media screen and (min-width: 900px) {
    width: ${({ width }) => width || "100%"};
  }
`;

export const Select = styled.select<Props>`
  border-radius: 10px;
  font-size: 1.4rem;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  background-color: ${({ theme }) => theme.colors.background.highlight};
  outline: none;
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Option = styled.option<Props>`
  border-radius: 10px;
  font-size: 1.4rem;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Error = styled.p`
  position: absolute;
  top: 100%;
  margin-top: 3px;
  font-size: 0.8rem;
  color: red;
`;
