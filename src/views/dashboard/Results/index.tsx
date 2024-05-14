import React, { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import Table from "components/Table";
import { THeader, TResult } from "types/index";
import RenderTable from "components/renderItems/RenderTable";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestResultList } from "Store/result/actions";
import { requestStudentList } from "Store/students/actions";
import TutorResultTable from "components/Table/TutorResultTable";
import useDeviceType from "hooks/useDeviceType";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { user } = useSelector((state: RootState) => state.user);
  const {
    student,
    students,
    isLoading: studentLoading,
  } = useSelector((state: RootState) => state.student);
  const { results: studentResult, isLoading: resultLoading } = useSelector(
    (state: RootState) => state.result
  );

  const [tableTutorEmpty, setTableTutorEmpty] = useState(false);

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];

  const userType = user?.info?.userType || localStorage.getItem("userType");

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
        title={isMobile ? "" : "Completed Quizzes"}
        isEmpty={userType === "tutor" ? tableTutorEmpty : results.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
        isLoading={userType === "tutor" ? studentLoading : resultLoading}
      >
        {userType === "tutor" ? (
          <TutorResultTable
            dashBoard
            emptyState={(empty) => setTableTutorEmpty(empty)}
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
