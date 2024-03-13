import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import BaseModel from "./pages/baseModel";
import Resource from "./pages/resource";
import RequireAuth from "./components/requireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/select-model" replace />,
      },
      {
        path: "/select-model",
        element: <BaseModel />,
      },
      {
        path: "/select-resource",
        element: <Resource />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
