import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestResultList } from "Store/result/actions";
import { requestStudentList } from "Store/students/actions";
import * as Block from "blocks/Dashboard";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.user);
  const { student, students } = useSelector(
    (state: RootState) => state.student
  );

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

  return <Block.ResultsCard origin />;
};

export default Results;
