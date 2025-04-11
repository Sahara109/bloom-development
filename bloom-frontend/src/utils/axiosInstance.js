import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Add a request interceptor to include the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle unauthorized errors globally
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
