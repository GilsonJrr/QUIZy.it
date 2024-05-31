import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.main.default};
  gap: 60px;
  padding: 100px 20px 10px;
  @media screen and (min-width: 900px) {
    gap: 60px;
    padding: 60px 200px;
  }
`;

export const FormContainer = styled.div<Props>`
  display: flex;
  width: 100%;
  @media screen and (min-width: 900px) {
    width: 55%;
  }
`;

export const ImageContainer = styled.img<Props>`
  display: flex;
  width: 45%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: 20px;
  object-fit: cover;
`;
