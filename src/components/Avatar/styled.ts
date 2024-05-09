import styled from "styled-components";

type Props = {
  size?: string;
};

export const Container = styled.div<Props>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  background-color: #e6e6e6;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export const Name = styled.h2<Props>`
  font-size: ${({ size }) => size};
`;

export const Photo = styled.img<Props>`
  object-fit: cover;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
