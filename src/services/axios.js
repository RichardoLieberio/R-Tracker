import axios from 'axios';

import {toast} from 'react-toastify';

let controller;

const axiosInstance = axios.create({
    baseURL: process.env.API_URI,
    timeout: 1000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(requestSuccess, requestError);
axiosInstance.interceptors.response.use(responseSuccess, responseError);

function requestSuccess(config) {
    if (config.useAbortController) {
        controller && controller.abort();
        controller = new AbortController();
        config.signal = controller.signal;
    }
    return config;
}

function requestError(error) {
    console.error(error);
}

function responseSuccess(response) {
    return response;
}

function responseError(error) {
    if (error.code === 'ECONNABORTED') toast.error('Request timeout')
    else if (!axios.isCancel(error)) console.error(error);
}

export default axiosInstance;