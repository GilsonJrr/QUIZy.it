import styled from "styled-components";

type Props = {
  active?: boolean;
  radius?: number;
  color?: string;
};

export const Container = styled.div<Props>`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow: scroll;
  position: relative;
  padding: 0 40px 0 0;
  &:after {
    content: "";
    position: fixed;
    height: 40px;
    width: 50px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      ${({ theme }) => theme.colors.background.highlight} 60%
    );
    right: 0;
  }

  @media screen and (min-width: 900px) {
    overflow: auto;
  }
`;

export const Tab = styled.div<Props>`
  border: ${({ color }) => (color ? 4 : 1)}px solid
    ${({ theme, color }) => (color ? color : theme.colors.main.default)};
  border-radius: ${({ radius }) => radius || 20}px;
  padding: ${({ color }) => (color ? "1px 20px" : "4px 20px")};
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.main.default : theme.colors.background.tertiary};
  color: ${({ active, theme }) =>
    active ? theme.colors.background.tertiary : theme.colors.main.default};
  font-size: 0.9rem;

  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;
