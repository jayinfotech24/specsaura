import Appapis from "./apiendpoints"

import axios from "axios"


const axiosInstance = axios.create({
    baseURL: Appapis.Basurl, // Ensure this is a valid URL

});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");


        config.headers["userId"] = userId || "null"
        config.headers["token"] = token || "null"
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance