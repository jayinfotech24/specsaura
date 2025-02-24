import Appapis from "./apiendpoints"

import axios from "axios"


const axiosInstance = axios.create({
    baseURL: Appapis.Basurl, // Ensure this is a valid URL
    headers: {
        "Content-Type": "application/json"
    }
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || null;
        const userId = localStorage.getItem("userId") || null;

        if (token) {
            config.headers["userToken"] = token;
        }


        if (userId) {
            config.headers["userId"] = userId;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Unauthorized access. Redirecting...");
                // Optionally, redirect the user to login
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance