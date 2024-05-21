import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import { TFillTheBlanksQuestions } from "Store/quiz/types";
import { Answer } from "types/index";

type FilTheBlanksProps = {
  questions: TFillTheBlanksQuestions;
  setSelectedAnswer: (answer: Answer) => void;
  resetTrigger: boolean;
};

const FilTheBlanks: FC<FilTheBlanksProps> = ({
  questions,
  setSelectedAnswer,
  resetTrigger,
}) => {
  const [blanks, setBlanks] = useState<any>([""]);

  const handleAnswer = () => {
    const rightAnswers = questions?.spitedPhrase
      ?.filter((a) => questions.rightAnswer?.includes(a))
      .filter((a) => blanks?.includes(a));

    const wrongAnswers = questions?.spitedPhrase
      ?.filter((a) => questions.rightAnswer?.includes(a))
      .filter((a) => !blanks?.includes(a));

    const fillResults = questions?.spitedPhrase?.map((a, index) => {
      return {
        value: a,
        selectedValue: blanks[index] || "",
        type: rightAnswers?.includes(a)
          ? "right"
          : wrongAnswers?.includes(a)
          ? "wrong"
          : "default",
      };
    });

    const answer: Answer = {
      finalAnswer: (
        <Styled.AnswerCheckerContainer>
          {fillResults?.map((answer: any, index: number) => {
            return (
              <Styled.AnswerCheckerText fillAnswerType={answer.type}>
                {answer.value}
              </Styled.AnswerCheckerText>
            );
          })}
        </Styled.AnswerCheckerContainer>
      ),
      resume: {
        question: questions.spitedPhrase?.join(" ") || "",
        selectedFillAnswer: fillResults,
      },
      type: questions?.spitedPhrase
        ?.filter((a) => questions.rightAnswer?.includes(a))
        .every((a) => blanks.includes(a))
        ? "correct"
        : "incorrect",
    };
    setSelectedAnswer(answer);
  };

  const handleAnswerFill = (entry: string, index: number) => {
    const newArray = [...blanks];
    newArray[index] = entry.replace(/\s+/g, "");
    setBlanks(newArray);
  };

  useEffect(() => {
    setBlanks([""]);
  }, [resetTrigger]);

  return (
    <Styled.QuestionContainer>
      <Styled.Question>Fill the blanks</Styled.Question>
      <Styled.OptionsContainer>
        <Styled.Words>
          {questions?.spitedPhrase?.map((word: string, answerIndex: number) => {
            return questions.rightAnswer?.includes(word) ? (
              <Styled.Input
                width={word.length}
                value={blanks[answerIndex] || ""}
                onChange={(e) => handleAnswerFill(e.target.value, answerIndex)}
                onBlur={handleAnswer}
              />
            ) : (
              <h1>{word}</h1>
            );
          })}
        </Styled.Words>
      </Styled.OptionsContainer>
    </Styled.QuestionContainer>
  );
};

export default FilTheBlanks;
