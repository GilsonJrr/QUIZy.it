import React, { useEffect, useMemo, useState } from "react";
import * as Styled from "../styled";
import { TTutorResult } from "types/index";
import Table from "components/Table";
import Card from "components/Card";
import RenderTable from "components/renderItems/RenderTable";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { requestQuizList } from "Store/quiz/actions";

export const TutorPage = () => {
  const { students, isLoading } = useSelector(
    (state: RootState) => state.studentReducer
  );
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);

  const dispatch = useDispatch();

  const userID = localStorage.getItem("userId") || "";

  const [search, setSearch] = useState<string>();
  const [searchStudents, setSearchStudents] = useState<string>();
  const TableHeaderTitles = [
    { label: "Name", width: 40 },
    { label: "Quiz", width: 40 },
    { label: "Score", width: 15 },
    { label: "", width: 15 },
  ];

  const filterStudents = students?.filter((e) =>
    e.info?.name.toUpperCase().includes(searchStudents?.toUpperCase() || "")
  );

  const filterQuizzes = quizzes?.filter((e) =>
    e.title.toUpperCase().includes(search?.toUpperCase() || "")
  );

  const tutorResults = useMemo(() => {
    return students
      ? students
          // eslint-disable-next-line array-callback-return
          ?.map((item) => {
            const student = item.info;
            const results = item.results;
            if (results) {
              return Object.values(results).map((result) => ({
                name: student?.name || "",
                quiz: result.quizTitle || "",
                score: `${result.score} / ${result.amount}` || "",
              }));
            }
          })
          .flat()
          .filter((u) => u !== undefined)
      : [];
  }, [students]);

  useEffect(() => {
    if (students === undefined) {
      dispatch(requestStudentList({ uid: userID }));
    }
  }, [dispatch, students, userID]);

  useEffect(() => {
    dispatch(requestQuizList({ uid: userID || "", size: 50 }));
  }, [dispatch, userID]);

  return (
    <Styled.Container>
      <Card
        gridName="card1"
        title="All Quizes"
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
      >
        {filterQuizzes?.map((item) => {
          return <RenderQuizCard item={item} editMode />;
        })}
      </Card>
      <Card
        gridName="card3"
        title="My students"
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
      >
        {isLoading ? (
          <>Loading...</>
        ) : (
          filterStudents?.map((item) => {
            if (item.info) {
              return <RenderStudentCard item={item.info} />;
            }
            return null;
          })
        )}
      </Card>
      <Card
        gridName="card2"
        title="Last Completed Quizzes"
        isEmpty={tutorResults?.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
        redirectTo="Results"
        redirectPath="/results"
      >
        <Table<TTutorResult>
          header={TableHeaderTitles}
          content={tutorResults.slice(0, 5) as TTutorResult[]}
          renderItem={(item) => <RenderTable tutorResultTable={item} />}
        />
      </Card>
    </Styled.Container>
  );
};
