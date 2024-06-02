import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import * as Block from "blocks/Dashboard";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { students } = useSelector((state: RootState) => state.student);

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
