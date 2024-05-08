import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #4a4747;
  gap: 60px;
  padding: 60px 100px;
`;

export const FormContainer = styled.div<Props>`
  display: flex;
  width: 55%;
`;

export const ImageContainer = styled.img<Props>`
  display: flex;
  width: 45%;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border-radius: 20px;
  object-fit: cover;
`;
