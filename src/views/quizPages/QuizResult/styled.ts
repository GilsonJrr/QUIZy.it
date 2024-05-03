import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  background-color: #d9dadb;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const Score = styled.h2`
  border-radius: 100%;
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  @media screen and (min-width: 600px) {
    font-size: 10rem;
  }
`;

export const ScoreMessage = styled.p`
  text-align: center;
  padding: 0 30px;
  font-size: 0.8rem;
  font-weight: 500;
  @media screen and (min-width: 600px) {
    width: 40%;
    font-size: 1.1rem;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
  border-radius: 20px;
  padding: 20px 40px;
`;
