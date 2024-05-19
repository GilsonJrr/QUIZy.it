import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestResultList } from "Store/result/actions";
import { requestStudentList } from "Store/students/actions";
import TutorResultTable from "components/Table/TutorResultTable";
import useDeviceType from "hooks/useDeviceType";
import StudentResultTable from "components/Table/StudentResultTable";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { userStudent } = useSelector((state: RootState) => state.user);
  const { user, isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const {
    student,
    students,
    isLoading: studentLoading,
  } = useSelector((state: RootState) => state.student);
  const { results: studentResult } = useSelector(
    (state: RootState) => state.result
  );

  const [tableTutorEmpty, setTableTutorEmpty] = useState(false);

  const userType = user?.info?.userType || localStorage.getItem("userType");

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
        isEmpty={tableTutorEmpty}
        emptyMessage={"you have not completed any quiz so far"}
        isLoading={userType === "tutor" ? studentLoading : userLoading}
        innerCard={isMobile}
      >
        {userType === "tutor" ? (
          <TutorResultTable
            dashBoard
            emptyState={(empty) => setTableTutorEmpty(empty)}
          />
        ) : (
          <StudentResultTable
            dashBoard
            emptyState={(empty) => setTableTutorEmpty(empty)}
            studentID={userStudent?.uid}
          />
        )}
      </Card>
    </Styled.Container>
  );
};

export default Results;
