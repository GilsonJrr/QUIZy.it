import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import QuizDashboard from "views/dashboard/QuizDashboard";
import Quiz from "views/Quiz";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
