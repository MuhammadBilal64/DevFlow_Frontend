import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
function getUserFromToken(token) {
  const decodedToken = jwtDecode(token);

  return {
    id: decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
    email:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    role:
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
  };
}
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
    setUser,

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