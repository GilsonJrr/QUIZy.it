import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

import { useLocation, useNavigate } from "react-router-dom";
import { TOptions } from "types/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestCategoryList } from "Store/category/actions";
import { requestQuizList } from "Store/quiz/actions";
import useDeviceType from "hooks/useDeviceType";
import { useTranslation } from "react-i18next";
import { LoadingContainerFullPage } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";

import * as Block from "blocks/Quizzes";
import CardTab from "components/CardTab";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();

  const editQuiz = new URLSearchParams(location.search).get("Edit");
  const quizId = new URLSearchParams(location.search).get("quizId");

  const [cardTab, setCardTab] = useState(t("quizzes.quizzes"));
  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const { student } = useSelector((state: RootState) => state.student);
  const { categories, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const { quizzes } = useSelector((state: RootState) => state.quiz);

  const userID = user?.info?.uid || userStudent?.uid;
  const userType = user?.info?.userType
    ? user?.info?.userType
    : student?.info?.userType || localStorage.getItem("userType");
  const requestUid =
    userType === "tutor" ? userID || "" : userStudent?.tutorID || "";

  useEffect(() => {
    if (categories === undefined) {
      dispatch(requestCategoryList({ uid: requestUid }));
    }
  }, [dispatch, categories, requestUid]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: requestUid, size: 50 }));
    }
  }, [dispatch, quizzes, requestUid, userID]);

  const Options: TOptions[] = [
    {
      option: t("quizzes.quizzes"),
      active: cardTab === t("quizzes.quizzes"),
      onClick: () => {
        setCardTab(t("quizzes.quizzes"));
        navigate("/quizzes");
      },
    },
    {
      option: quizId ? t("quizzes.editQuizzes") : t("quizzes.newQuizzes"),
      active: cardTab === t("quizzes.newQuizzes"),
      onClick: () => {
        if (quizId) return;
        setCardTab(t("quizzes.newQuizzes"));
        navigate("/quizzes");
      },
    },
    {
      option: t("quizzes.addCategory"),
      active: cardTab === t("quizzes.addCategory"),
      onClick: () => {
        setCardTab(t("quizzes.addCategory"));
        navigate("/quizzes");
      },
    },
  ];

  useEffect(() => {
    if (editQuiz) {
      setCardTab(t("quizzes.newQuizzes"));
    }
  }, [editQuiz, t]);

  if (categoryLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <Styled.Container>
      <CardTab
        options={userType === "tutor" ? Options : []}
        innerCard={isMobile}
      >
        {cardTab === t("quizzes.quizzes") && (
          <Block.QuizList
            userType={userType || ""}
            onClick={() => {
              setCardTab(t("quizzes.newQuizzes"));
            }}
          />
        )}
        {cardTab === t("quizzes.newQuizzes") && <Block.QuizCreate />}
        {cardTab === t("quizzes.addCategory") && <Block.CategoryCreate />}
      </CardTab>
    </Styled.Container>
  );
};

export default Quizzes;
