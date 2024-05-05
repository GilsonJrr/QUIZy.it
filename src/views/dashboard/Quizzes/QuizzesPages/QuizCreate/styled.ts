import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 9vh);
  padding: 20px 40px;
`;
