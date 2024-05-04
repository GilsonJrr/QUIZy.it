import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "layout/Dashboard";
import QuizDashboard from "views/dashboard/QuizDashboard";
import Quiz from "views/quizPages/Quiz";
import Results from "views/dashboard/Results";
import Quizzes from "views/dashboard/Quizzes";
import QuizResult from "views/quizPages/QuizResult";
import Students from "views/dashboard/Students";
import { ModalProvider } from "components/Modal/modalContext";
import { userType } from "assets/consts";

const Routers = () => {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route element={<Dashboard />}>
            <Route path="/" element={<QuizDashboard />} />
            <Route path="/quizzes" element={<Quizzes />} />
            {userType === "tutor" && (
              <Route path="/students" element={<Students />} />
            )}
            <Route path="/results" element={<Results />} />
          </Route>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizResult" element={<QuizResult />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
};

export default Routers;
