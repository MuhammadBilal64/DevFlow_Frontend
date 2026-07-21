import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/login/*"
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
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;