import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import { multipleChosesSchema } from "lib/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import QuizForm from "layout/QuizForm";
import { QuizTypeValues, TMultipleQuestions } from "Store/quiz/types";
import { idGenerator, randomize } from "utils/index";
import QuizTemplate from "layout/Quiz/QuizTemplate";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useLocation } from "react-router-dom";
import { useModalContext } from "components/Modal/modalContext";
import useDeviceType from "hooks/useDeviceType";
import Button from "components/Button";
import { addLeadingZero } from "functions/index";
import AlertModal from "components/Modal/AlertModal";
import { TQuizDelete } from "types/index";

type MultipleQuestionProps = {
  sendQuiz: (data: QuizTypeValues) => void;
  deleteQuiz: (data: TQuizDelete) => void;
};

type TMultipleQuestionsForm = {
  questions: {
    questionTitle: string;
    answer01: string;
    answer02: string;
    answer03?: string;
    answer04?: string;
    rightAnswer?: string;
  }[];
};

const MultipleQuestion: FC<MultipleQuestionProps> = ({
  sendQuiz,
  deleteQuiz,
}) => {
  const location = useLocation();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const { user } = useSelector((state: RootState) => state.user);
  const { quiz, quizzes } = useSelector((state: RootState) => state.quiz);

  const quizId = new URLSearchParams(location.search).get("quizId");

  const [question, setQuestion] = useState<number[]>([0]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
    setValue,
    reset,
  } = useForm<TMultipleQuestionsForm>({
    resolver: yupResolver(multipleChosesSchema),
  });

  const onSubmit = (data: TMultipleQuestionsForm) => {
    if (quizzes && quizzes?.length >= 100) {
      return handleModal(
        <AlertModal
          type="warning"
          title="Quiz Creation Limit"
          totalTime={6000}
          message={`You have reached the maximum number of quizzes you can create. 
          Please delete an existing quiz or contact support for assistance.`}
        />
      );
    }
    handleTestAllQuestions();

    const addRightAnswer = (): TMultipleQuestionsForm => {
      return {
        questions: data.questions.map((question) => ({
          ...question,
          rightAnswer: question.answer01,
        })),
      };
    };

    const dataPrepared = {
      id: idGenerator(18),
      uid: user?.info?.uid || "",
      ...JSON.parse(localStorage.getItem("preSendQuiz") || ""),
      ...addRightAnswer(),
    };

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
    setQuestion(question?.filter((a) => a !== id));
    setSelectedQuestion(id - 1);
  };

  const addButtonDisabled = !question.every((question) => {
    return (
      watch(`questions.${question}.questionTitle`)?.trim() ||
      watch(`questions.${question}.answer01`)?.trim() ||
      watch(`questions.${question}.answer02`)?.trim()
    );
  });

  const errorEmptyQuestion = question.findIndex((q) => {
    const questionData = watch(`questions.${q}`);
    if (!questionData) return true;
    const { questionTitle, answer01, answer02 } = watch(`questions.${q}`);
    return !(questionTitle?.trim() && answer01?.trim() && answer02?.trim());
  });

  const handleTestAllQuestions = () => {
    if (errorEmptyQuestion !== -1) {
      setSelectedQuestion(errorEmptyQuestion);
    }
  };

  const questions = [
    {
      id: 1,
      answer: watch(`questions.${selectedQuestion}.answer01`),
      type: "correct",
    },
    {
      id: 2,
      answer: watch(`questions.${selectedQuestion}.answer02`),
      type: "incorrect",
    },
    {
      id: 3,
      answer: watch(`questions.${selectedQuestion}.answer03`),
      type: "incorrect",
    },
    {
      id: 4,
      answer: watch(`questions.${selectedQuestion}.answer04`),
      type: "incorrect",
    },
  ];

  const questionTest: any[] = [
    {
      question: watch(`questions.${selectedQuestion}.questionTitle`),
      answers: randomize(questions?.filter((a) => a.answer !== "")),
      correctAnswers: watch(`questions.${selectedQuestion}.answer01`),
    },
  ];

  const handleDelete = () => {
    const dataDelete = {
      quizTitle: quiz?.title || "",
      uid: user?.info?.uid || "",
      quizId: quizId || "",
    };
    deleteQuiz(dataDelete);
  };

  useEffect(() => {
    if (quiz) {
      setQuestion(Object.keys(quiz?.questions || 0).map(Number) || [0]);
      const questions = quiz?.questions as TMultipleQuestions[];

      questions?.forEach((question, index) => {
        setValue(`questions.${index}.questionTitle`, question.questionTitle);
        setValue(`questions.${index}.answer01`, question.answer01);
        setValue(`questions.${index}.answer02`, question.answer02);
        setValue(`questions.${index}.answer03`, question.answer03);
        setValue(`questions.${index}.answer04`, question.answer04);
        setValue(`questions.${index}.rightAnswer`, question.rightAnswer);
      });
    }
  }, [quiz, setValue]);

  useEffect(() => {
    if (quizId === null) {
      const emptyState: TMultipleQuestionsForm = {
        questions: [
          {
            questionTitle: "",
            answer01: "",
            answer02: "",
            answer03: "",
            answer04: "",
            rightAnswer: "",
          },
        ],
      };
      reset(emptyState);
      setQuestion([0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizForm
      preview={
        <Styled.PreviewContainer>
          <QuizTemplate
            questions={questionTest}
            quizId={quiz?.id || ""}
            preview
            type="Multiple"
          />
        </Styled.PreviewContainer>
      }
      formName={"FormMultipleQuestion"}
      title={"Multiple choices"}
      buttonTitle={quizId ? "Update" : "Save"}
      edit={!!quizId}
      deleteTitle={isMobile ? "Delete" : "Delete Quiz"}
      handleDelete={handleDelete}
    >
      <Styled.Container>
        <Styled.Form
          id="FormMultipleQuestion"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SimpleInput
            label={"Question"}
            placeholder="Enter question title"
            value={watch(`questions.${selectedQuestion}.questionTitle`) || ""}
            error={errors.questions?.[selectedQuestion]?.questionTitle}
            {...register(`questions.${selectedQuestion}.questionTitle`)}
          />

          <Styled.AnswerContainer>
            <SimpleInput
              label={<Styled.Label>Right answer</Styled.Label>}
              value={watch(`questions.${selectedQuestion}.answer01`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer01}
              {...register(`questions.${selectedQuestion}.answer01`)}
              width="45%"
            />
            <SimpleInput
              label={"Answer 2"}
              value={watch(`questions.${selectedQuestion}.answer02`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer02}
              {...register(`questions.${selectedQuestion}.answer02`)}
              width="45%"
            />
            <SimpleInput
              label={"Answer 3"}
              value={watch(`questions.${selectedQuestion}.answer03`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer03}
              {...register(`questions.${selectedQuestion}.answer03`)}
              width="45%"
            />
            <SimpleInput
              label={"Answer 4"}
              value={watch(`questions.${selectedQuestion}.answer04`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer04}
              {...register(`questions.${selectedQuestion}.answer04`)}
              width="45%"
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
            <Button onClick={() => handleDeleteQuestion(selectedQuestion)}>
              Delete
            </Button>
          )}
          {question.length < 15 && (
            <Button onClick={handleAddQuestion} disabled={addButtonDisabled}>
              Add
            </Button>
          )}
        </Styled.ButtonContainer>
        <Styled.QuestionsContainer>
          {question.map((question, index) => {
            return (
              <Button
                onClick={() => setSelectedQuestion(question)}
                variant={
                  selectedQuestion === question ? "primary" : "secondary"
                }
                padding="10px 15px"
                radius="50px"
              >
                Q {addLeadingZero(index + 1)}
              </Button>
            );
          })}
        </Styled.QuestionsContainer>
      </Styled.Container>
    </QuizForm>
  );
};

export default MultipleQuestion;
