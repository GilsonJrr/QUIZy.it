import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "layout/Dashboard";
import QuizDashboard from "views/dashboard/QuizDashboard";
import Quiz from "views/Quiz";
import Results from "views/dashboard/Results";
import Quizzes from "views/dashboard/Quizzes";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<QuizDashboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/results" element={<Results />} />
        </Route>
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default Routers;
