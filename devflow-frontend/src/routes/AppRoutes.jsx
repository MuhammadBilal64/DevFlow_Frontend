import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/auth/*"
        element={<AuthRoutes />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/auth/login" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;