import styled from "styled-components";

type Props = {
  size?: string;
};

export const Container = styled.div<Props>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  background-color: ${({ theme }) => theme.colors.main.secondary};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  cursor: pointer;
`;

export const Name = styled.h2<Props>`
  font-size: ${({ size }) => size};
  color: ${({ theme }) => theme.colors.main.default};
`;

export const Photo = styled.img<Props>`
  object-fit: cover;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  cursor: pointer;
`;
