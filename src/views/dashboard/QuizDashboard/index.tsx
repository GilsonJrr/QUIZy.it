import React from "react";
import { StudentPage } from "./DashBoardPages/studentPage";
import { TutorPage } from "./DashBoardPages/TutorPage";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

const QuizDashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userType = user?.info?.userType;

  if (userType === "student") return <StudentPage />;

  if (userType === "tutor") return <TutorPage />;

  return null;
};

export default QuizDashboard;
