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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useLocation } from "react-router-dom";
import { useModalContext } from "components/Modal/modalContext";
import DeleteModal from "components/Modal/DeleteModal";
import { removeQuiz } from "Store/quiz/actions";
import useDeviceType from "hooks/useDeviceType";

type TrueOrFalseQuestionProps = {
  sendQuiz: (data: QuizTypeValues) => void;
};

type TTrueOrFalseQuestionsFrom = {
  questions: {
    questionTitle: string;
    rightAnswer?: boolean;
  }[];
};

const TrueOrFalseQuestion: FC<TrueOrFalseQuestionProps> = ({ sendQuiz }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const { quiz } = useSelector((state: RootState) => state.quizReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);

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
    handleModal(
      <DeleteModal
        deleteTitle={quiz?.title || ""}
        onDelete={() =>
          dispatch(
            removeQuiz({ uid: user?.info?.uid || "", quizId: quizId || "" })
          )
        }
      />
    );
  };

  useEffect(() => {
    if (quiz) {
      setQuestion(Object.keys(quiz?.questions || 0).map(Number) || [0]);
      const questions = quiz?.questions as TTrueOrFalseQuestions[];

      questions?.forEach((question, index) => {
        setValue(`questions.${index}.questionTitle`, question.questionTitle);
        setValue(
          `questions.${index}.rightAnswer`,
          question.rightAnswer || true
        );
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
          <QuizTemplate questions={questionTest} quizId={quiz?.id || ""} />
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
