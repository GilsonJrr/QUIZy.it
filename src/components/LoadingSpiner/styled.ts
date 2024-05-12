import styled, { keyframes } from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #4a4747;
  border-left-color: #4a4747;
  border-right-color: #4a4747;
  animation: ${spinAnimation} 0.8s linear infinite;
`;
