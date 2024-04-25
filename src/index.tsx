import React from "react";
import ReactDOM from "react-dom/client";
import QuizDashboard from "views/dashboard/QuizDashboard";
import Quiz from "views/Quiz";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "lib/styles/globalStyles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizDashboard />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
