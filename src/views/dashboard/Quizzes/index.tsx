import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

import { GiCardRandom } from "react-icons/gi";
import { FaFastBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { randomQuiz } from "functions/index";
import { TOptions } from "types/index";
import OptionsButton from "components/OptionsButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdPlaylistAddCheck } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestCategoryList } from "Store/category/actions";
import { requestQuizList } from "Store/quiz/actions";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import { useTranslation } from "react-i18next";
import { LoadingContainerFullPage } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";

import * as Block from "blocks/Dashboard";

type QuizzesProps = {};

const Quizzes: FC<QuizzesProps> = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();
  const { t } = useTranslation();

  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const { student } = useSelector((state: RootState) => state.student);
  const { categories: cat, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const { quizzes } = useSelector((state: RootState) => state.quiz);

  const [tab, setTab] = useState(t("quizzes.options"));

  const userID = user?.info?.uid || userStudent?.uid;
  const userType = user?.info?.userType
    ? user?.info?.userType
    : student?.info?.userType || localStorage.getItem("userType");
  const requestUid =
    userType === "tutor" ? userID || "" : userStudent?.tutorID || "";

  const navigate = useNavigate();
  const lastQuiz = localStorage.getItem("lastQuiz") || "";

  const StudentOptions: TOptions[] = [
    {
      option: t("quizzes.radonQuiz"),
      optionIcon: <GiCardRandom size={40} />,
      onClick: () =>
        navigate(
          randomQuiz(
            quizzes?.length || 0,
            quizzes?.map((quiz) => quiz.id as string) || [""]
          )
        ),
    },
    {
      option: t("quizzes.retryLastQuiz"),
      optionIcon: <FaFastBackward size={40} />,
      onClick: () => navigate(`/quiz?quizId=${lastQuiz}`),
    },
  ];

  const TutorOptions: TOptions[] = [
    {
      option: t("quizzes.addQuiz"),
      optionIcon: <IoMdAddCircleOutline size={40} />,
      onClick: () => navigate("/quizzes/quiz-create"),
    },
    {
      option: t("quizzes.addCategory"),
      optionIcon: <MdPlaylistAddCheck size={40} />,
      onClick: () => navigate("/quizzes/category-create"),
    },
  ];

  useEffect(() => {
    if (cat === undefined) {
      dispatch(requestCategoryList({ uid: requestUid }));
    }
  }, [dispatch, cat, requestUid]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: requestUid, size: 50 }));
    }
  }, [dispatch, quizzes, requestUid, userID]);

  if (categoryLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: t("quizzes.options") },
              { label: t("quizzes.quizzes") },
              { label: t("quizzes.categories") },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(!isMobile || tab === t("quizzes.options")) && (
        <OptionsButton
          options={userType === "student" ? StudentOptions : TutorOptions}
          width="45%"
        />
      )}
      {(!isMobile || tab === t("quizzes.quizzes")) && (
        <Block.QuizzesCard
          gridName="card2"
          editMode={userType === "tutor"}
          origin
        />
      )}
      {(!isMobile || tab === t("quizzes.categories")) && (
        <Block.CategoriesCard
          gridName="card3"
          editMode={userType === "tutor"}
        />
      )}
    </Styled.Container>
  );
};

export default Quizzes;
