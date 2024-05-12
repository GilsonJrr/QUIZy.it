import React from "react";
import { StudentPage } from "./DashBoardPages/studentPage";
import { TutorPage } from "./DashBoardPages/TutorPage";

const QuizDashboard = () => {
  const userType = localStorage.getItem("userType");

  if (userType === "student") return <StudentPage />;

  if (userType === "tutor") return <TutorPage />;

  return null;
};

export default QuizDashboard;
