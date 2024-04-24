import styled from "styled-components";

type Props = {
  side?: "left" | "right";
  show?: boolean;
  displayQuantity?: number;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  /* height: 100vh; */
  width: 100%;
  background-color: #f5f6fa;
  box-sizing: border-box;
  /* position: relative; */
`;
