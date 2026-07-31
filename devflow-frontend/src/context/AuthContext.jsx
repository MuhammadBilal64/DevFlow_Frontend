import { createContext, useContext, useState } from "react";
import { getUserFromToken } from "../utils/tokenUtils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || localStorage.getItem("token")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    return token ? getUserFromToken(token) : null;
  });

  const login = (authData) => {
    const tokenVal = authData?.token || authData?.accessToken;
    const refreshVal = authData?.refreshToken;

    if (!authData || !tokenVal) {
      throw new Error("Invalid authentication response: Missing access token.");
    }

    localStorage.setItem("accessToken", tokenVal);
    localStorage.setItem("token", tokenVal);
    if (refreshVal) {
      localStorage.setItem("refreshToken", refreshVal);
      setRefreshToken(refreshVal);
    }

    setAccessToken(tokenVal);
    const decodedUser = getUserFromToken(tokenVal);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}