import api from "./api";

/**
 * Auth API Services (details.md MODULE 1)
 */

export async function login(data) {
  return await api.post("/Auth/Login", data);
}

export async function register(data) {
  return await api.post("/Auth/Register", data);
}

export async function refreshToken(refreshTokenStr) {
  return await api.post("/Auth/refresh", { refreshToken: refreshTokenStr });
}

export async function logout(refreshTokenStr) {
  return await api.post("/Auth/logout", { refreshToken: refreshTokenStr });
}