import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import { trueOrFalseSchema } from "lib/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import QuizForm from "layout/QuizForm";
import ToggleInput from "components/inputs/ToggleInput";
import { QuizTypeValues, TTrueOrFalseQuestions } from "Store/quiz/types";
import { idGenerator } from "utils/index";
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

type TrueOrFalseQuestionProps = {
  sendQuiz: (data: QuizTypeValues) => void;
  deleteQuiz: (data: TQuizDelete) => void;
};

type TTrueOrFalseQuestionsFrom = {
  questions: {
    questionTitle: string;
    rightAnswer?: boolean;
  }[];
};

const TrueOrFalseQuestion: FC<TrueOrFalseQuestionProps> = ({
  sendQuiz,
  deleteQuiz,
}) => {
  const location = useLocation();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const { quiz, quizzes } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.user);

  const [question, setQuestion] = useState([0]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const userID = user?.info?.uid;

  const quizId = new URLSearchParams(location.search).get("quizId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
    setValue,
    reset,
  } = useForm<TTrueOrFalseQuestionsFrom>({
    resolver: yupResolver(trueOrFalseSchema),
  });

  const onSubmit = (data: TTrueOrFalseQuestionsFrom) => {
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

    const dataPrepared = {
      id: idGenerator(18),
      uid: userID || "",
      ...JSON.parse(localStorage.getItem("preSendQuiz") || ""),
      ...data,
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

  const questions = [
    {
      id: 1,
      answer:
        watch(`questions.${selectedQuestion}.rightAnswer`)?.toString() || "",
      type: "correct",
    },
    {
      id: 1,
      answer:
        (!watch(`questions.${selectedQuestion}.rightAnswer`))?.toString() || "",
      type: "incorrect",
    },
  ];

  const questionTest: any[] = [
    {
      question: watch(`questions.${selectedQuestion}.questionTitle`),
      answers: questions,
      correctAnswers: watch(`questions.${selectedQuestion}.rightAnswer`),
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
      const questions = quiz?.questions as TTrueOrFalseQuestions[];

      questions?.forEach((question, index) => {
        setValue(`questions.${index}.questionTitle`, question.questionTitle);
        setValue(`questions.${index}.rightAnswer`, question.rightAnswer);
      });
    }
  }, [quiz, setValue]);

  useEffect(() => {
    if (quizId === null) {
      const emptyState: TTrueOrFalseQuestionsFrom = {
        questions: [
          {
            questionTitle: "",
            rightAnswer: true,
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
            type="TrueOrFalse"
          />
        </Styled.PreviewContainer>
      }
      formName={"FormTrueOrFalseQuestion"}
      title={"True Or False"}
      buttonTitle="Save"
      edit={!!quizId}
      deleteTitle={isMobile ? "Delete" : "Delete Quiz"}
      handleDelete={handleDelete}
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
              value={
                watch(`questions.${selectedQuestion}.rightAnswer`) || false
              }
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
            <Button onClick={() => handleDeleteQuestion(selectedQuestion)}>
              Delete
            </Button>
          )}
          <Button onClick={handleAddQuestion} disabled={addButtonDisabled}>
            Add
          </Button>
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

export default TrueOrFalseQuestion;
