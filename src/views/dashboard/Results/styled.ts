import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  width: 100%;
  /* min-height: 100%; */
  padding: 0px;
  /* height: 100%; */
  height: calc(100vh - 6vh);
  @media screen and (min-width: 600px) {
    height: calc(100vh - 9vh);
    padding: 20px 40px;
    /* height: 100%; */
  }
`;
