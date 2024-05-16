import styled from "styled-components";

type Props = { width?: number; align?: "center" | "flex-start" };

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  position: relative;
  overflow: hidden;
`;

export const TableContent = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  overflow: auto;
`;

export const TableBodyContent = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

export const TableHeaderComponents = styled.div<Props>`
  width: ${({ width }) => width}%;
  background-color: ${({ theme }) => theme.colors.main.default};
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 600px) {
    justify-content: ${({ align }) => align || "flex-start"};
  }
`;
