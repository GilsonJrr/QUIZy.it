import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  h2 {
    margin-bottom: 30px;
  }
`;

export const Image = styled.img`
  height: 60vh;
  object-fit: cover;
`;
