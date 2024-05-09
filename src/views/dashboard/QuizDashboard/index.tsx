import React from "react";
import { StudentPage } from "./DashBoardPages/studentPage";
import { TutorPage } from "./DashBoardPages/TutorPage";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

const QuizDashboard = () => {
  const { user, userStudent } = useSelector(
    (state: RootState) => state.userReducer
  );

  if (userStudent?.info?.userType === "student") return <StudentPage />;

  if (user?.info?.userType === "tutor") return <TutorPage />;

  return null;
};

export default QuizDashboard;
