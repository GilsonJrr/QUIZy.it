import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import { trueOrFalseSchema } from "lib/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import QuizForm from "layout/QuizForm";
import ToggleInput from "components/inputs/ToggleInput";
import { QuizTypeValues } from "Store/quiz/types";
import { idGenerator } from "utils/index";

type TrueOrFalseQuestionProps = {
  sendQuiz: (data: QuizTypeValues) => void;
};

type TTrueOrFalseQuestions = {
  questions: {
    questionTitle: string;
    rightAnswer?: boolean;
  }[];
};

const TrueOrFalseQuestion: FC<TrueOrFalseQuestionProps> = ({ sendQuiz }) => {
  const [question, setQuestion] = useState([0]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const userID = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
    setValue,
  } = useForm<TTrueOrFalseQuestions>({
    resolver: yupResolver(trueOrFalseSchema),
  });

  const onSubmit = (data: TTrueOrFalseQuestions) => {
    handleTestAllQuestions();

    const dataPrepared = {
      id: idGenerator(18),
      uid: userID || "",
      ...JSON.parse(localStorage.getItem("preSendQuiz") || ""),
      ...data,
    };

    console.log("data aqui e", dataPrepared);
    sendQuiz(dataPrepared);
  };

  const handleAddQuestion = () => {
    if (question.length < 15) {
      setQuestion([...question, question[question.length - 1] + 1]);
      setSelectedQuestion(question[question.length - 1] + 1);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    unregister(`questions.${selectedQuestion}`);
    setQuestion(question.filter((a) => a !== id));
    setSelectedQuestion(id - 1);
  };

  const addButtonDisabled = !question.every((question) => {
    return (
      watch(`questions.${question}.questionTitle`)?.trim() ||
      watch(`questions.${question}.rightAnswer`)
    );
  });

  const errorEmptyQuestion = question.findIndex((q) => {
    const questionData = watch(`questions.${q}`);
    if (!questionData) return true;
    const { questionTitle, rightAnswer } = watch(`questions.${q}`);
    return !(questionTitle?.trim() && rightAnswer);
  });

  const handleTestAllQuestions = () => {
    if (errorEmptyQuestion !== -1) {
      setSelectedQuestion(errorEmptyQuestion);
    }
  };

  return (
    <QuizForm
      preview={undefined}
      edit={false}
      formName={"FormTrueOrFalseQuestion"}
      title={"True Or False"}
      buttonTitle="Save"
    >
      <Styled.Container>
        <Styled.Form
          id="FormTrueOrFalseQuestion"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SimpleInput
            label={"Question"}
            placeholder="Enter question title"
            value={watch(`questions.${selectedQuestion}.questionTitle`) || ""}
            error={errors.questions?.[selectedQuestion]?.questionTitle}
            {...register(`questions.${selectedQuestion}.questionTitle`)}
          />
          <Styled.AnswerContainer justify="flex-start">
            <ToggleInput
              Label="Answer"
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              setValue={(value) =>
                setValue(`questions.${selectedQuestion}.rightAnswer`, value)
              }
            />
          </Styled.AnswerContainer>
        </Styled.Form>
        <Styled.ButtonContainer
          justify={
            question.length > 1 && selectedQuestion !== 0
              ? "space-between"
              : "flex-end"
          }
        >
          {question.length > 1 && selectedQuestion !== 0 && (
            <Styled.SubmitButton
              onClick={() => handleDeleteQuestion(selectedQuestion)}
            >
              Delete
            </Styled.SubmitButton>
          )}
          <Styled.SubmitButton
            onClick={handleAddQuestion}
            disabled={addButtonDisabled}
          >
            Add
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
        <Styled.QuestionsContainer>
          {question.map((question, index) => {
            return (
              <Styled.QuestionTag
                onClick={() => setSelectedQuestion(question)}
                active={selectedQuestion === question}
              >
                Q {index + 1}
              </Styled.QuestionTag>
            );
          })}
        </Styled.QuestionsContainer>
      </Styled.Container>
    </QuizForm>
  );
};

export default TrueOrFalseQuestion;
