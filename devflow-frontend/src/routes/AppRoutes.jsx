import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/auth/*"
        element={<AuthRoutes />}
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/auth/login" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;