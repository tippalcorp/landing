import axios from "axios";

const apiBaseUrl =
  import.meta.env.PUBLIC_API_BASE_URL ||
  "https://tippal-backend.onrender.com/api";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});
