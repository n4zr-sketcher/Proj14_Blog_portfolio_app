import axios from "axios";
import { auth } from "./firebase";

// Backend address:
// 1. If REACT_APP_API_URL is provided in .env / Vercel, use it.
// 2. If running deployed on Vercel / non-localhost, automatically default to your live Render backend!
// 3. Otherwise for local development, default to http://localhost:5000.
export const API_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
    ? "https://proj14-blog-portfolio-app.onrender.com"
    : "http://localhost:5000");

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
  (err?.request
    ? `Cannot reach backend at ${API_URL}. (Check that the backend is running and MongoDB is connected)`
    : "Something went wrong");

export default api;
