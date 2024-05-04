import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  width: 100%;
  padding: 0px;
  height: calc(100vh - 6vh);
  @media screen and (min-width: 600px) {
    height: calc(100vh - 9vh);
    padding: 0px 40px 20px 40px;
    display: flex;
    flex-direction: column;
  }
`;
