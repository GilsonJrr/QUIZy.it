import React, { FC } from "react";
import * as Styled from "./styled";
import { Answer, EAnswerIndexation, QuestionFiltered } from "types/index";
import Button from "components/Button";

type MultipleProps = {
  title: string;
  question: QuestionFiltered;
  selectedAnswer: string;
  showAnswer?: boolean;
  setSelectedAnswer: (answer: Answer) => void;
};

const Multiple: FC<MultipleProps> = ({
  title,
  question,
  selectedAnswer,
  showAnswer,
  setSelectedAnswer,
}) => {
  return (
    <Styled.QuestionContainer>
      <Styled.Question>{title}</Styled.Question>
      <Styled.OptionsContainer>
        {question?.answers?.map((answer: any, index: number) => {
          const active = answer.answer === selectedAnswer;
          return (
            <Styled.ButtonContainer>
              <Button
                onClick={() => setSelectedAnswer(answer)}
                variant={active ? "success" : "secondary"}
                disabled={showAnswer}
                width="100%"
                padding="20px"
              >
                <Styled.ButtonContent>
                  <Styled.AnswerIndex>
                    {EAnswerIndexation[index]}
                  </Styled.AnswerIndex>
                  <Styled.AnswerText active={active}>
                    {answer.answer || ""}
                  </Styled.AnswerText>
                </Styled.ButtonContent>
              </Button>
            </Styled.ButtonContainer>
          );
        })}
      </Styled.OptionsContainer>
    </Styled.QuestionContainer>
  );
};

export default Multiple;
