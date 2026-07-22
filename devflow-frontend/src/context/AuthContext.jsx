import { createContext, useContext, useState } from "react";
import { getUserFromToken } from "../utils/tokenUtils";
const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  const [user, setUser] = useState(()=>{
    const token = localStorage.getItem("accessToken");

  return token ? getUserFromToken(token) : null;
  });



  const login = (authData) => {

    localStorage.setItem(
      "accessToken",
      authData.accessToken
    );

    localStorage.setItem(
      "refreshToken",
      authData.refreshToken
    );


    setAccessToken(authData.accessToken);
    setRefreshToken(authData.refreshToken);
    setUser(getUserFromToken(authData.accessToken));
  };


  const logout = () => {

    localStorage.removeItem("accessToken");
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