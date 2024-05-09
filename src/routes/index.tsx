import React, { useEffect, useState } from "react";
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
import NotFound from "views/NotFound";
import QuizCreate from "views/dashboard/Quizzes/QuizzesPages/QuizCreate";
import StudentCreate from "views/dashboard/Students/StudentPages/StudentCreate";
import GroupCreate from "views/dashboard/Students/StudentPages/GroupCreate";
import StudentProfile from "views/dashboard/Students/StudentPages/StudentProfile";
import LoadingImage from "components/LoadingImage";
import AuthPages from "layout/AuthPages";
import Login from "views/auth/Login";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { auth } from "lib/firebase";
import SignUp from "views/auth/SignUp";
import CategoryCreate from "views/dashboard/Quizzes/QuizzesPages/CategoryCreate";

const Routers = () => {
  const { isLoading } = useSelector((state: RootState) => state.authReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userType = user?.info?.userType;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const userID = localStorage.getItem("userId");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setIsAuthenticated(true);
      } else {
        // No user is signed in.
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [userID]);

  if (isLoading && isAuthenticated === true) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return (
      <Router>
        <ModalProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route element={<AuthPages />}>
              <Route path="/login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
            </Route>
          </Routes>
        </ModalProvider>
      </Router>
    );
  }

  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route element={<Dashboard />}>
            <Route path="/" element={<QuizDashboard />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/teste" element={<LoadingImage />} />
            {userType !== "student" && (
              <>
                <Route path="/quizzes/quiz-create" element={<QuizCreate />} />
                <Route
                  path="/quizzes/category-create"
                  element={<CategoryCreate />}
                />
                <Route path="/students" element={<Students />} />
                <Route
                  path="/students/student-profile"
                  element={<StudentProfile />}
                />
                <Route
                  path="/students/student-create"
                  element={<StudentCreate />}
                />
                <Route
                  path="/students/group-create"
                  element={<GroupCreate />}
                />
              </>
            )}
            <Route path="/results" element={<Results />} />
          </Route>
          {userType === "student" && (
            <Route
              path="/students"
              element={<Navigate to="/not-found" replace />}
            />
          )}
          {isAuthenticated && (
            <Route path="/login" element={<Navigate to="/" replace />} />
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
