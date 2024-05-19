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
import ProfileModal from "components/Modal/ProfileModal";
import { LoadingContainerFullPage } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import ResetPassword from "views/auth/ResetPassword";
import RequestReset from "views/auth/RequestReset";

const Routers = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userType = user?.info?.userType;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const userID = user?.info?.uid;

  //TODO: coocar isso no redux
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [userID]);

  console.log("isAuthenticated", isAuthenticated);

  if (isAuthenticated === undefined) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  if (isAuthenticated === false) {
    return (
      <Router>
        <ModalProvider>
          <Routes>
            <Route element={<AuthPages />}>
              <Route path="/login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/request-reset" element={<RequestReset />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
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
            <Route path="/profile" element={<ProfileModal />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
};

export default Routers;
