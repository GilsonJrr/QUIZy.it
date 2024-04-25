import styled from "styled-components";

type Props = {
  side?: "left" | "right";
  show?: boolean;
  displayQuantity?: number;
};

export const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #ebf0ef;
  height: 100%;
`;

export const QuizzesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: center; */
  width: 100%;
  /* margin-left: 100px; */
  padding: 20px 0 0 100px;
`;
