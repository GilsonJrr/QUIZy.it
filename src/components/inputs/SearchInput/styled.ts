import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 0 10px;
  width: 100%;
  @media screen and (min-width: 600px) {
    width: auto;
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  width: 80%;
`;
