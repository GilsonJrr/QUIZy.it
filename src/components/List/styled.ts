import styled from "styled-components";

type Props = {
  wrap?: boolean;
};

export const List = styled.div<Props>`
  display: flex;
  width: 100%;
  gap: 20px;

  flex-direction: ${({ wrap }) => (wrap ? "row" : "column")};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
`;

export const ListContent = styled.div<Props>`
  width: ${({ wrap }) => (wrap ? 48 : 100)}%;
`;

export const EmptyState = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
