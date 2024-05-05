import React from "react";
import { userType } from "assets/consts";
import { StudentPage } from "./DashBoardPages/studentPage";
import { TutorPage } from "./DashBoardPages/TutorPage";

const QuizDashboard = () => {
  if (userType === "student") return <StudentPage />;

  if (userType === "tutor") return <TutorPage />;

  return null;
};

export default QuizDashboard;
