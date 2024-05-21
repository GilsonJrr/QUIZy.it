import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import { FillTheBlanksSchema } from "lib/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import QuizForm from "layout/QuizForm";
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

type FillTheBlanksProps = {
  sendQuiz: (data: QuizTypeValues) => void;
  deleteQuiz: (data: TQuizDelete) => void;
};

type TFillTheBlanksQuestionsFrom = {
  questions: {
    questionTitle: string;
    rightAnswer?: string[];
    spitedPhrase?: string[];
  }[];
};

const FillTheBlanks: FC<FillTheBlanksProps> = ({ sendQuiz, deleteQuiz }) => {
  const location = useLocation();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const { quiz, quizzes } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.user);

  const [question, setQuestion] = useState([0]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [hiddenWords, setHiddenWords] = useState([""]);

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
  } = useForm<TFillTheBlanksQuestionsFrom>({
    resolver: yupResolver(FillTheBlanksSchema),
  });

  const spitedPhrase = watch(`questions.${selectedQuestion}.questionTitle`)
    ?.split(" ")
    .filter((empty) => empty !== "");
  const handleSplittedValues = () => {
    setValue(`questions.${selectedQuestion}.spitedPhrase`, spitedPhrase);
    hiddenWords.length > 0 &&
      setValue(
        `questions.${selectedQuestion}.rightAnswer`,
        hiddenWords?.filter((a) => spitedPhrase?.includes(a))
      );
    return;
  };

  const onSubmit = (data: TFillTheBlanksQuestionsFrom) => {
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
        setValue(
          `questions.${index}.spitedPhrase`,
          question.spitedPhrase as unknown as string[]
        );
        setValue(
          `questions.${index}.rightAnswer`,
          question.rightAnswer as unknown as string[]
        );
      });
    }
  }, [quiz, setValue]);

  useEffect(() => {
    setHiddenWords(watch(`questions.${selectedQuestion}.rightAnswer`) || []);
  }, [selectedQuestion, watch]);

  useEffect(() => {
    if (quizId === null) {
      const emptyState: TFillTheBlanksQuestionsFrom = {
        questions: [
          {
            questionTitle: "",
            rightAnswer: [""],
          },
        ],
      };
      reset(emptyState);
      setQuestion([0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddHiddenWord = (word: string) => {
    if (hiddenWords.includes(word)) {
      hiddenWords && setHiddenWords(hiddenWords?.filter((a) => a !== word));
      hiddenWords &&
        setValue(
          `questions.${selectedQuestion}.rightAnswer`,
          hiddenWords?.filter((a) => a !== word)
        );
      return;
    }
    setHiddenWords(
      [...hiddenWords, word].filter((a) => spitedPhrase?.includes(a))
    );
    setValue(
      `questions.${selectedQuestion}.rightAnswer`,
      [...hiddenWords, word].filter((a) => spitedPhrase?.includes(a))
    );
  };

  const handleAddQuestion = () => {
    if (question.length < 15) {
      setQuestion([...question, question[question.length - 1] + 1]);
      setSelectedQuestion(question[question.length - 1] + 1);
    }
  };

  return (
    <QuizForm
      preview={
        <Styled.PreviewContainer>
          <QuizTemplate
            filTheBlanks={[
              {
                rightAnswer: watch(`questions.${selectedQuestion}.rightAnswer`),
                spitedPhrase: watch(
                  `questions.${selectedQuestion}.spitedPhrase`
                ),
              },
            ]}
            quizId={quiz?.id || ""}
            preview
            type="FillTheBlanks"
          />
        </Styled.PreviewContainer>
      }
      formName={"FormFillTheBlanksQuestion"}
      title={"True Or False"}
      buttonTitle="Save"
      edit={!!quizId}
      deleteTitle={isMobile ? "Delete" : "Delete Quiz"}
      handleDelete={handleDelete}
    >
      <Styled.Container>
        <Styled.Form
          id="FormFillTheBlanksQuestion"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SimpleInput
            {...register(`questions.${selectedQuestion}.questionTitle`)}
            label={"Final Answer"}
            placeholder="Enter question title"
            value={watch(`questions.${selectedQuestion}.questionTitle`) || ""}
            error={errors.questions?.[selectedQuestion]?.questionTitle}
            onBlur={handleSplittedValues}
          />
          {spitedPhrase?.length > 1 && (
            <>
              <h2>Choose Words to be Blank</h2>
              <Styled.Words>
                {spitedPhrase?.map((word) => {
                  return (
                    <Button
                      variant={
                        hiddenWords.includes(word) ? "primary" : "secondary"
                      }
                      padding="5px 10px"
                      radius="40px"
                      type="button"
                      onClick={() => handleAddHiddenWord(word)}
                    >
                      {word}
                    </Button>
                  );
                })}
              </Styled.Words>
            </>
          )}
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

export default FillTheBlanks;
