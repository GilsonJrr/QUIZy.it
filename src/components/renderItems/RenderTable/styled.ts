import styled from "styled-components";

type Props = { width?: number };

export const Option = styled.div<Props>`
  display: flex;
  background-color: #4a4747;
  color: #ffffff;
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
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 600px) {
    justify-content: flex-start;
  }
`;
