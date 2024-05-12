import React from "react";
import { StudentPage } from "./DashBoardPages/studentPage";
import { TutorPage } from "./DashBoardPages/TutorPage";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

const QuizDashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { student } = useSelector((state: RootState) => state.studentReducer);

  if (student?.info?.userType === "student") return <StudentPage />;

  if (user?.info?.userType === "tutor") return <TutorPage />;

  return null;
};

export default QuizDashboard;
