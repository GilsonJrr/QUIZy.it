import React, { useEffect, useState } from "react";
import * as Styled from "../styled";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { requestQuizList } from "Store/quiz/actions";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import { useTranslation } from "react-i18next";
import * as Block from "blocks/Dashboard";
import { useNavigate } from "react-router-dom";

export const TutorPage = () => {
  const { students } = useSelector((state: RootState) => state.student);
  const { quizzes } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isMobile = useDeviceType();
  const navigate = useNavigate();

  const userID = user?.info?.uid;

  const [tab, setTab] = useState("Quizzes");

  useEffect(() => {
    if (students === undefined) {
      dispatch(requestStudentList({ uid: userID || "" }));
    }
  }, [dispatch, students, userID]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: userID || "", size: 50 }));
    }
  }, [dispatch, quizzes, userID]);

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: t("dashboard.labelQuizzes") },
              { label: t("dashboard.labelStudents") },
              { label: t("dashboard.labelResults") },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(tab === t("dashboard.labelQuizzes") || !isMobile) && (
        <Block.QuizzesCard gridName="card1" editMode />
      )}
      {(tab === t("dashboard.labelStudents") || !isMobile) && (
        <Block.StudentsCard
          gridName="card3"
          onClick={() => navigate("/students?Profile=true")}
        />
      )}
      {(tab === t("dashboard.labelResults") || !isMobile) && (
        <Block.ResultsCard gridName="card2" />
      )}
    </Styled.Container>
  );
};
