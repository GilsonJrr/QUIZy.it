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
// import Button from "components/Button";
// import { requestQuizList } from "Store/quiz/actions";
// import LoadingSpinner from "components/LoadingSpiner";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { userStudent } = useSelector((state: RootState) => state.user);
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user, isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const {
    student,
    students,
    isLoading: studentLoading,
  } = useSelector((state: RootState) => state.student);

  const [tableTutorEmpty, setTableTutorEmpty] = useState(false);

  const userType = user?.info?.userType || localStorage.getItem("userType");

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(
        requestResultList({
          uid: student?.info?.tutorID || "",
          studentUid: student?.info?.uid || "",
        })
      );
    }
  }, [dispatch, quizzes, student]);

  useEffect(() => {
    if (students === undefined) {
      dispatch(
        requestStudentList({
          uid: user?.info?.uid || "",
        })
      );
    }
  }, [dispatch, user, students]);

  // const updateResult = () => {
  //   dispatch(
  //     dispatch(requestQuizList({ uid: user?.info?.uid || "", size: 50 }))
  //   );
  // };

  return (
    <Card
      title={isMobile ? "" : "Completed Quizzes"}
      isEmpty={tableTutorEmpty}
      emptyMessage={"you have not completed any quiz so far"}
      isLoading={
        quizLoading || userType === "tutor" ? studentLoading : userLoading
      }
      innerCard={isMobile}
    >
      <Styled.CardContainer>
        {userType === "tutor" ? (
          <TutorResultTable emptyState={(empty) => setTableTutorEmpty(empty)} />
        ) : (
          <StudentResultTable
            dashBoard
            emptyState={(empty) => setTableTutorEmpty(empty)}
            studentID={userStudent?.uid}
          />
        )}
        {/* <Styled.ButtonContainer>
          <Button align="center" onClick={updateResult}>
            {quizLoading ? <LoadingSpinner color="light" /> : "Update results"}
          </Button>
        </Styled.ButtonContainer> */}
      </Styled.CardContainer>
    </Card>
  );
};

export default Results;
