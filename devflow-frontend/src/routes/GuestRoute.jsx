import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function GuestRoute({ children }) {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default GuestRoute;
