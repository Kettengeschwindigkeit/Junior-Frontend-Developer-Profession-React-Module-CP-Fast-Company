import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFirebase) {
            // console.log(config);
            const containSlash = /\/$/gi.test(config.url);
            // config.url = "profession/123343340f9"
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            // console.log(config.url)
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => res,
    function (error) {
        console.log("Interceptor");

        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
