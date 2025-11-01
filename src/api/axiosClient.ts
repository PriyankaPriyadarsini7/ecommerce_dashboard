import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://dummyjson.com", // Your mock API
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Example: Attach auth header if implemented later
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response]`, response.status, response.config.url);
    return response;
  },
  (error) => {
    const message = error?.response?.data || error.message || "Network error";
    return Promise.reject(message);
  }
);

export default axiosClient;
