import styled from "styled-components";

import { FaSearch } from "react-icons/fa";

type Props = { width?: string };

export const Container = styled.div<Props>`
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  background-color: ${({ theme }) => theme.colors.background.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 0 10px;
  width: 100%;
  @media screen and (min-width: 900px) {
    width: ${({ width }) => (width ? width : "auto")};
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  width: 80%;
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Search = styled(FaSearch)`
  color: ${({ theme }) => theme.colors.main.default};
`;
