import React, { useEffect, useState } from "react";
import * as Styled from "../styled";
import Card from "components/Card";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { requestQuizList } from "Store/quiz/actions";
import TutorResultTable from "components/Table/TutorResultTable";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";

export const TutorPage = () => {
  const { students, isLoading } = useSelector(
    (state: RootState) => state.studentReducer
  );
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quizReducer
  );

  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const userID = localStorage.getItem("userId") || "";

  const [search, setSearch] = useState<string>();
  const [searchStudents, setSearchStudents] = useState<string>();
  const [tableIsEmpty, setTableIsEmpty] = useState(false);
  const [tab, setTab] = useState("Quizzes");

  const filterStudents = students?.filter((e) =>
    e.info?.name.toUpperCase().includes(searchStudents?.toUpperCase() || "")
  );

  const filterQuizzes = quizzes?.filter((e) =>
    e.title.toUpperCase().includes(search?.toUpperCase() || "")
  );

  useEffect(() => {
    if (students === undefined) {
      dispatch(requestStudentList({ uid: userID }));
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
              { label: "Quizzes" },
              { label: "Students" },
              { label: "Results" },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(tab === "Quizzes" || !isMobile) && (
        <Card
          gridName="card1"
          title={isMobile ? "" : "All Quizes"}
          isEmpty={filterQuizzes?.length === 0}
          emptyMessage={
            search
              ? "Quiz not found"
              : "No new quiz available at this time. Please check later"
          }
          scrollable
          searchable
          searchValue={search}
          setSearch={(e) => setSearch(e)}
          redirectTo="Quizzes"
          redirectPath="/quizzes"
          isLoading={quizLoading}
        >
          {filterQuizzes?.map((item) => {
            return <RenderQuizCard item={item} editMode />;
          })}
        </Card>
      )}
      {(tab === "Students" || !isMobile) && (
        <Card
          gridName="card3"
          title={isMobile ? "" : "My students"}
          isEmpty={filterStudents?.length === 0}
          emptyMessage={
            searchStudents
              ? "Student not found"
              : "you have not registered any student so far"
          }
          scrollable
          searchable
          searchValue={searchStudents}
          setSearch={(e) => setSearchStudents(e)}
          redirectTo="Students"
          redirectPath="/students"
          isLoading={isLoading}
        >
          {filterStudents?.map((item) => {
            if (item.info) {
              return <RenderStudentCard item={item.info} />;
            }
            return null;
          })}
        </Card>
      )}
      {(tab === "Results" || !isMobile) && (
        <Card
          gridName="card2"
          title={isMobile ? "" : "Last Completed Quizzes"}
          isEmpty={tableIsEmpty}
          emptyMessage={"you have not completed any quiz so far"}
          redirectTo="Results"
          redirectPath="/results"
          isLoading={isLoading}
        >
          <TutorResultTable
            dashBoard
            emptyState={(empty) => setTableIsEmpty(empty)}
          />
        </Card>
      )}
    </Styled.Container>
  );
};
