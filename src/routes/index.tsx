import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "layout/Dashboard";
import QuizDashboard from "views/dashboard/QuizDashboard";
import User from "views/dashboard/User";
import Settings from "views/dashboard/Settings";
import Quiz from "views/Quiz";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<QuizDashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default Routers;
