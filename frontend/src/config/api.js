import axios from "axios";
import { auth } from "./firebase";

// Backend address. Set REACT_APP_API_URL for production (no trailing slash).
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL: API_URL });

// Attach the logged-in user's Firebase or Dev token to every request
api.interceptors.request.use(async (config) => {
  try {
    const user = auth?.currentUser;
    if (user && typeof user.getIdToken === "function") {
      const token = await user.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (err) {
    console.warn("[API Interceptor] Token attachment warning:", err);
  }
  return config;
});

// Turn an axios error into a readable message
export const getErrorMessage = (err) =>
  err?.response?.data?.message ||
  (err?.request ? "Cannot reach the backend server (Make sure backend is running on port 5000)" : "Something went wrong");

export default api;
