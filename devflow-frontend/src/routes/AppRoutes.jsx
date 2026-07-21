import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

function AppRoutes() {
  return (
    <Routes>

      {/* Any URL starting with /login is handled by the authentication module */}
      <Route
        path="/login/*"
        element={<AuthRoutes />}
      />

      {/* Fallback route:
          If no route above matches, redirect the user to /login.
          'replace' removes the invalid URL from browser history,
          so pressing Back won't return to it. */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;