import React, { FC } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import { easyQuizzes } from "assets/consts";
import RenderQuizCard from "components/renderItems/RenderQuizCard";

import { GiCardRandom } from "react-icons/gi";
import { FaFastBackward } from "react-icons/fa";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  return (
    <Styled.Container>
      <Styled.OptionButtonContainer>
        <Styled.OptionButton>
          <GiCardRandom size={40} />
          Radon Quiz
        </Styled.OptionButton>
        <Styled.OptionButton>
          <FaFastBackward size={40} />
          Retry last Quiz
        </Styled.OptionButton>
      </Styled.OptionButtonContainer>
      <Card
        gridName="card2"
        title="New Quizes"
        isEmpty={easyQuizzes && easyQuizzes.length < 0}
        emptyMessage={"No new quiz available at this time. Please check later"}
      >
        {easyQuizzes?.map((item) => {
          return <RenderQuizCard item={item} />;
        })}
      </Card>
      <Card
        gridName="card3"
        title="Categories"
        isEmpty={easyQuizzes && easyQuizzes.length < 0}
        emptyMessage={"No new quiz available at this time. Please check later"}
      >
        {easyQuizzes?.map((item) => {
          return <RenderQuizCard item={item} />;
        })}
      </Card>
    </Styled.Container>
  );
};

export default Quizzes;
