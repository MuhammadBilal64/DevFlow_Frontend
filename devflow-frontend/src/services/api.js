import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7106/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

function clearAuthStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

function isAuthRequest(url = "") {
  const path = url.toLowerCase();
  return (
    path.includes("/auth/login") ||
    path.includes("/auth/register") ||
    path.includes("/auth/refresh") ||
    path.includes("/auth/logout")
  );
}

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const refreshRes = await axios.post(`${API_BASE_URL}/Auth/refresh`, {
        refreshToken,
      });

      const tokenData = refreshRes.data?.data || refreshRes.data;
      const newAccessToken = tokenData?.token || tokenData?.accessToken;
      if (!newAccessToken) {
        throw new Error("Token refresh failed");
      }

      const newRefreshToken = tokenData.refreshToken || refreshToken;
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("token", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      return newAccessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

// Request Interceptor: Attach Bearer Token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Unwrap response data & handle 401 token refresh
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRequest(originalRequest.url)
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        clearAuthStorage();
        window.location.href = "/auth/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default api;
