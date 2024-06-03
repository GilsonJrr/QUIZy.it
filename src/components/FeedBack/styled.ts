import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  width: 100%;
  padding: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 900px) {
    width: 400px;
  }
`;

export const Summary = styled.summary`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.button.primary};
  padding: 10px 40px;
  border-radius: 10px;
  display: flex;
`;

export const Details = styled.details`
  background-color: ${({ theme }) => theme.colors.button.secondary};
  border-radius: 10px;
`;
