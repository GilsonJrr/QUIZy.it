import styled from "styled-components";

type Props = { width?: number };

export const Option = styled.div<Props>`
  display: flex;
  background-color: ${({ theme }) => theme.colors.main.default};
  color: ${({ theme }) => theme.colors.background.tertiary};
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  width: ${({ width }) => width || 10}%;
  height: 100%;
  padding: 5px 10px;
`;

export const TableContent = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  position: relative;
`;

export const TableBodyComponents = styled.div<Props>`
  width: ${({ width }) => width}%;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  padding: 5px 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 600px) {
    justify-content: flex-start;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: 10px;
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 10px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-top: 6px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 10px;
`;
