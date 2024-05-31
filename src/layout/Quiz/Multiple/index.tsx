import React, { FC } from "react";
import * as Styled from "./styled";
import { Answer, EAnswerIndexation, QuestionFiltered } from "types/index";

import Button, { variant } from "components/Button";
import { Title } from "components/ui/Typography/styled";
import useDeviceType from "hooks/useDeviceType";

type MultipleProps = {
  title: string;
  question: QuestionFiltered;
  selectedAnswer: string;
  showAnswer?: boolean;
  setSelectedAnswer: (answer: Answer) => void;
  preview?: boolean;
};

const Multiple: FC<MultipleProps> = ({
  title,
  question,
  selectedAnswer,
  showAnswer,
  setSelectedAnswer,
  preview,
}) => {
  const isMobile = useDeviceType();

  const handleSelectedAnswer = (data: Answer) => {
    const answer: Answer = {
      ...data,
      finalAnswer: question.correctAnswers.toString(),
      resume: {
        question: question.question,
        rightAnswer: question.correctAnswers.toString(),
        selectedAnswer: data.answer,
      },
    };

    setSelectedAnswer(answer);
  };

  const handleAnswerColor = (type: string, active: boolean) => {
    switch (true) {
      case showAnswer && type === "correct":
        return "success";
      case showAnswer && type === "correct" && active:
        return "success";
      case showAnswer && type === "incorrect" && active:
        return "danger";
      case !active:
        return "default";
      case active:
        return "success";
    }
  };

  return (
    <Styled.QuestionContainer preview={preview}>
      <Title
        size="bigger"
        multiLine
        margin="20px 0 30px"
        textAlign="center"
        width={isMobile ? "100%" : "50%"}
      >
        {title}
      </Title>
      <Styled.OptionsContainer>
        {question?.answers?.map((answer: any, index: number) => {
          const active = answer.answer === selectedAnswer;
          const type = answer.type;
          return (
            <Styled.ButtonContainer>
              <Button
                onClick={() => handleSelectedAnswer(answer)}
                variant={handleAnswerColor(type, active) as variant}
                disabled={showAnswer}
                partialDisabled
                width="100%"
                padding="15px"
              >
                <Styled.ButtonContent
                  reverse={!((showAnswer && !active) || !showAnswer)}
                >
                  {(showAnswer && !active) || !showAnswer ? (
                    <Styled.AnswerIndex>
                      {EAnswerIndexation[index]}
                    </Styled.AnswerIndex>
                  ) : (
                    <Styled.AnswerIndex active={showAnswer}>
                      {type === "correct" ? (
                        <Styled.CheckIcon size={25} />
                      ) : (
                        <Styled.CloseIcon size={35} />
                      )}
                    </Styled.AnswerIndex>
                  )}
                  <Title
                    textAlign="left"
                    margin="0 auto 0 0"
                    multiLine
                    width="70%"
                    color="light"
                  >
                    {answer.answer || ""}
                  </Title>
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
