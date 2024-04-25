import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  padding: 10px 20px;
  border-radius: 30px;
  border: 2px solid #000000;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.4rem;
`;
