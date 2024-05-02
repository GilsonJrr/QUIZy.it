import styled from "styled-components";

type Props = { width?: number };

export const TableContent = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
`;

export const TableBodyComponents = styled.div<Props>`
  width: ${({ width }) => width}%;
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px 10px;
  border-radius: 3px;
`;
