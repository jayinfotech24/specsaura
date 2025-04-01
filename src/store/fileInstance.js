import Appapis from "./apiendpoints"

import axios from "axios"


const fileInstance = axios.create({
    baseURL: Appapis.Basurl, // Ensure this is a valid URL

});
fileInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken");
        const userId = localStorage.getItem("userId");


        // config.headers["userId"] = userId || "null"
        config.headers["authorization"] = `Bearer ${token || ""}` || "null"
        config.headers["Content-Type"] = "multipart/form-data";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default fileInstance