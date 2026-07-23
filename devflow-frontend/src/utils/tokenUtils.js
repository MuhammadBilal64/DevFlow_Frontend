import { jwtDecode } from "jwt-decode";

export function getUserFromToken(token) {
    try{
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
}catch{
return null;
}
}