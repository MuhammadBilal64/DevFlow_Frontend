import { createContext, useState } from "react";
import { getUserFromToken } from "../utils/tokenUtils";
import { logout as logoutApi } from "../services/authService";

const AuthContext = createContext();

export { AuthContext };

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || localStorage.getItem("token")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    const decoded = token ? getUserFromToken(token) : null;
    if (decoded) return decoded;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }

    return null;
  });

  const login = (authData) => {
    const tokenVal = authData?.token || authData?.accessToken;
    const refreshVal = authData?.refreshToken;

    if (!authData || !tokenVal) {
      throw new Error("Invalid authentication response: Missing access token.");
    }

    const decodedUser = getUserFromToken(tokenVal);
    if (!decodedUser) {
      throw new Error("Invalid authentication response: Unable to decode user from token.");
    }

    localStorage.setItem("accessToken", tokenVal);
    localStorage.setItem("token", tokenVal);
    if (refreshVal) {
      localStorage.setItem("refreshToken", refreshVal);
      setRefreshToken(refreshVal);
    }

    setAccessToken(tokenVal);
    setUser(decodedUser);
    localStorage.setItem("user", JSON.stringify(decodedUser));
  };

  const logout = async () => {
    const refreshTokenVal = refreshToken || localStorage.getItem("refreshToken");
    try {
      if (refreshTokenVal) {
        await logoutApi(refreshTokenVal);
      }
    } catch {
      // Still clear local auth state even if server logout fails
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
    }
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
