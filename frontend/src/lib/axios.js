import axios from "axios";

// Dynamically choose the base URL based on the environment
// In development, it points to localhost
// In production, it points to the URL defined in .env.production
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: BASE_URL + "/api",
});

// Use an interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;