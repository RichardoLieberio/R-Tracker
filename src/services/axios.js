import axios from 'axios';

import {setToast} from '../services/toastService';

import store from '../redux/store';
import {setAccessToken, clearAccessToken, clearUserInfo, setAuthentication} from '../redux/authSlice';

import {toast} from 'react-toastify';

let axiosController;

const axiosInstance = axios.create({
    baseURL: process.env.API_URI,
    timeout: +process.env.REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(requestSuccess, requestError);
axiosInstance.interceptors.response.use(responseSuccess, responseError);

function requestSuccess(config) {
    config.rerequest ??= true;
    if (config.useAbortController) {
        axiosController && axiosController.abort();
        axiosController = new AbortController();
        config.signal = axiosController.signal;
    }
    return config;
}

function requestError(error) {
    console.error(error);
}

function responseSuccess(response) {
    const status = response?.data?.status;
    const accessToken = response?.data?.accessToken;
    const request = response.config;

    if (status === 429 || status === 500 || status === 503) {
        toast.error(response.data.msg);
    } else if (status === 200 && accessToken && request.rerequest) {
        store.dispatch(setAccessToken(accessToken));
        store.dispatch(setAuthentication(true));

        request.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(request);
    } else if (status === request.authenticated?.code) {
        store.dispatch(clearAccessToken());
        store.dispatch(clearUserInfo());
        store.dispatch(setAuthentication(false));
        setToast('error', response.data.msg);

        request.authenticated.navigate(request.authenticated.route, request.authenticated.options);
        return response;
    } else {
        return response;
    }
}

function responseError(error) {
    if (error.code === 'ECONNABORTED') toast.error('Request timeout')
    else if (!axios.isCancel(error)) console.error(error);
}

export {axiosController};
export default axiosInstance;