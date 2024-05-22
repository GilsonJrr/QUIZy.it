import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import * as Block from "blocks/QuizCreate/index";
import { QuizRequest, QuizTypeValues } from "Store/quiz/types";
import { useDispatch } from "react-redux";
import { removeQuiz, setQuiz } from "Store/quiz/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalContext } from "components/Modal/modalContext";
import AlertModal from "components/Modal/AlertModal";
import { TQuizDelete } from "types/index";
import DeleteModal from "components/Modal/DeleteModal";
import { useTranslation } from "react-i18next";

type QuizCreateProps = {};

const QuizCreate: FC<QuizCreateProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { handleModal } = useModalContext();

  const quizId = new URLSearchParams(location.search).get("quizId");

  const [quizType, setQuizType] = useState<string>();

  const crumbs = [
    { label: t("quizCreate.quizzes"), path: "/quizzes" },
    {
      label: quizId ? t("quizCreate.editQuiz") : t("quizCreate.addQuiz"),
      path: "",
    },
  ];

  const crumbsQuestion = [
    { label: t("quizCreate.quizzes"), path: "/quizzes" },
    {
      label: quizId ? t("quizCreate.editQuiz") : t("quizCreate.addQuiz"),
      onClick: () => setQuizType(undefined),
      path: "",
    },
    {
      label: quizId
        ? t("quizCreate.editQuestion")
        : t("quizCreate.addQuestion"),
      path: "",
    },
  ];

  useEffect(() => {
    return () => {
      localStorage.setItem("preSendQuiz", "");
    };
  }, []);

  const handleSendQuiz = (quiz: QuizTypeValues) => {
    dispatch(
      setQuiz(quiz as QuizRequest),
      handleModal(
        <AlertModal
          type={"success"}
          message={
            quizId !== null
              ? t("quizCreate.quizUpdateSuccess")
              : t("quizCreate.quizCreateSuccess")
          }
        />
      )
    );
    navigate("/quizzes");
  };

  const handleDelete = (deleteData: TQuizDelete) => {
    handleModal(
      <DeleteModal
        deleteTitle={deleteData.quizTitle || ""}
        onDelete={() => {
          dispatch(
            removeQuiz({
              uid: deleteData.uid || "",
              quizId: deleteData.quizId || "",
            })
          );
          navigate("/quizzes");
        }}
      />
    );
  };

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={!quizType ? crumbs : crumbsQuestion} />
      {!quizType && <Block.FormQuiz quizType={(e) => setQuizType(e)} />}
      {quizType === "Multiple" && (
        <Block.MultipleQuestion
          sendQuiz={(quiz) => handleSendQuiz(quiz)}
          deleteQuiz={(deleteData) => handleDelete(deleteData)}
        />
      )}
      {quizType === "TrueOrFalse" && (
        <Block.TrueOrFalseQuestion
          sendQuiz={(quiz) => handleSendQuiz(quiz)}
          deleteQuiz={(deleteData) => handleDelete(deleteData)}
        />
      )}
      {quizType === "FillTheBlanks" && (
        <Block.FillTheBlanks
          sendQuiz={(quiz) => handleSendQuiz(quiz)}
          deleteQuiz={(deleteData) => handleDelete(deleteData)}
        />
      )}
    </Styled.Container>
  );
};

export default QuizCreate;
