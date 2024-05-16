import styled from "styled-components";

type Props = {
  active?: boolean;
  radius?: number;
};

export const Container = styled.div<Props>`
  display: flex;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

export const Tab = styled.div<Props>`
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: ${({ radius }) => radius || 20}px;
  padding: 4px 20px;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.main.default : theme.colors.background.tertiary};
  color: ${({ active, theme }) =>
    active ? theme.colors.background.tertiary : theme.colors.main.default};
  font-size: 0.9rem;
`;
