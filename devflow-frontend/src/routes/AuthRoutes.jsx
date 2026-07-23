import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function AuthRoutes() {
  return (
    <Routes>

      <Route element={<AuthLayout />}>

        <Route
          index
          element={<Navigate to="login" replace />}
        />

        <Route
          path="login"
          element={<Login />}
        />

        <Route
          path="register"
          element={<Register />}
        />

      </Route>

    </Routes>
  );
}

export default AuthRoutes;