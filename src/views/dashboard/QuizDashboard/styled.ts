import styled from "styled-components";

type Props = {
  gridName?: string;
  scrollable?: boolean;
};

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px 40px;
  height: calc(100vh - 9vh);

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-areas:
    "card1 card3"
    "card1 card3"
    "card2 card3";
`;

export const Card = styled.div<Props>`
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 15px 20px;
  grid-area: ${({ gridName }) => gridName};
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: ${({ scrollable }) => (scrollable ? "100" : "0")}%;
    height: 50px;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 20%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
  }
`;

export const CardTitle = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  height: 100%;
`;

//TODO: componentizar esses estilos
export const QuizCard = styled.div`
  display: flex;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  min-height: 130px;
`;

export const QuizImage = styled.div`
  width: 25%;
  height: 100%;
  background-color: #f8f8;
  border-radius: 20px 0 0 20px;
`;

export const QuizTitlesContainer = styled.div`
  width: 75%;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const QuizTitle = styled.h3`
  font-size: 1.4rem;
`;

export const QuizInfo = styled.h3`
  font-size: 1rem;
  font-weight: 400;
`;

export const StartButton = styled.div`
  position: absolute;
  bottom: 15px;
  right: 30px;
  font-weight: 600;
`;
//TODO: componentizar esses estilos

export const EmptyListMessage = styled.h2`
  margin: auto;
  text-align: center;
  width: 50%;
  font-size: 1.1rem;
  font-weight: 500;
`;
