import styled from "styled-components";

type Props = {
  active?: boolean;
};

export const Container = styled.div<Props>`
  display: flex;
  gap: 10px;
`;

export const Tab = styled.div<Props>`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 4px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#4a4747" : "#FFFFFF")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#4a4747")};
`;
