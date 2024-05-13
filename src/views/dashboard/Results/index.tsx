import React, { FC, useEffect, useMemo } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import Table from "components/Table";
import { THeader, TResult, TTutorResult } from "types/index";
import RenderTable from "components/renderItems/RenderTable";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestResultList } from "Store/result/actions";
import { requestStudentList } from "Store/students/actions";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const {
    student,
    students,
    isLoading: studentLoading,
  } = useSelector((state: RootState) => state.studentReducer);
  const { results: studentResult, isLoading: resultLoading } = useSelector(
    (state: RootState) => state.resultReducer
  );
  const userType = user?.info?.userType || localStorage.getItem("userType");

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];

  const TableHeaderTutorTitles = [
    { label: "Name", width: 40 },
    { label: "Quiz", width: 40 },
    { label: "Score", width: 15 },
    { label: "", width: 15 },
  ];

  const results = useMemo(() => {
    return studentResult
      ? studentResult?.map((res) => {
          return {
            date: res.date || "",
            quiz: res.quizTitle || "",
            score: `${res.score} / ${res.amount}`,
            quizId: res.quizUid || "",
          };
        })
      : [];
  }, [studentResult]);

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
    if (studentResult === undefined) {
      dispatch(
        requestResultList({
          uid: student?.info?.tutorID || "",
          studentUid: student?.info?.uid || "",
        })
      );
    }
  }, [dispatch, student, studentResult]);

  useEffect(() => {
    if (students === undefined) {
      dispatch(
        requestStudentList({
          uid: user?.info?.uid || "",
        })
      );
    }
  }, [dispatch, user, students]);

  return (
    <Styled.Container>
      <Card
        title="Completed Quizzes"
        isEmpty={
          userType === "tutor"
            ? tutorResults.length === 0
            : results.length === 0
        }
        emptyMessage={"you have not completed any quiz so far"}
        isLoading={userType === "tutor" ? studentLoading : resultLoading}
      >
        {userType === "tutor" ? (
          <Table<TTutorResult>
            header={TableHeaderTutorTitles}
            content={tutorResults as TTutorResult[]}
            renderItem={(item) => <RenderTable tutorResultTable={item} />}
          />
        ) : (
          <Table<TResult>
            header={TableHeaderTitles}
            content={results}
            renderItem={(item) => <RenderTable item={item} />}
          />
        )}
      </Card>
    </Styled.Container>
  );
};

export default Results;
