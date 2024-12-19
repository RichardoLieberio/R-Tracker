import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import store from '../redux/store';
import {setAccessToken, setUserInfo, setAuthentication} from '../redux/authSlice';

import css from '../css/login';

function inputEffect(labelRef, inputRef, input, error, pwd=false) {
    inputRef.current.className = pwd
    ? error ? css.pwdInputError : css.pwdInput
    : error ? css.defaultInputError : css.defaultInput;

    labelRef.current.className = error
    ? inputRef.current === document.activeElement
        ? css.labelTopError
        : input ? css.labelTopError : css.labelMiddleError
    : inputRef.current === document.activeElement
        ? css.labelTopFocus
        : input ? css.labelTopBlur : css.labelMiddle;
}

async function login(email, pwd, rememberMe, csrfToken, accessToken, setFormError, navigate) {
    const data = {email, pwd, rememberMe};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        useAbortController: true,
        rerequest: false
    };

    const response = await axios.post('/api/auth/login', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setAccessToken(response.data.accessToken));
            store.dispatch(setUserInfo(response.data.userInfo));
            store.dispatch(setAuthentication(true));
            navigate('/', {replace: true});
            break;
        case 401:
            toast.error(response.data.msg);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            setFormError(response.data.msg);
            break;
    }
}

export default {inputEffect, login};