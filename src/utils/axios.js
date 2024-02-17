import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://foodie-backend-henna.vercel.app",
});

export default axiosInstance;
