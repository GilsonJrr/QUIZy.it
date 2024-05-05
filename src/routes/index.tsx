import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "layout/Dashboard";
import QuizDashboard from "views/dashboard/QuizDashboard";
import Quiz from "views/quizPages/Quiz";
import Results from "views/dashboard/Results";
import Quizzes from "views/dashboard/Quizzes";
import QuizResult from "views/quizPages/QuizResult";
import Students from "views/dashboard/Students";
import { ModalProvider } from "components/Modal/modalContext";
import { userType } from "assets/consts";
import NotFound from "views/NotFound";

const Routers = () => {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route element={<Dashboard />}>
            <Route path="/" element={<QuizDashboard />} />
            <Route path="/quizzes" element={<Quizzes />} />
            {userType !== "student" && (
              <Route path="/students" element={<Students />} />
            )}
            <Route path="/results" element={<Results />} />
          </Route>
          {userType === "student" && (
            <Route
              path="/students"
              element={<Navigate to="/not-found" replace />}
            />
          )}
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizResult" element={<QuizResult />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
};

export default Routers;
