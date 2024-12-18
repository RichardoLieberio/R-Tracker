import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import css from '../css/registerForm';

function inputEffect(labelRef, inputRef, input, error) {
    inputRef.current.className = error ? css.defaultInputError : css.defaultInput;

    labelRef.current.className = error
    ? inputRef.current === document.activeElement
        ? css.labelTopError
        : input ? css.labelTopError : css.labelMiddleError
    : inputRef.current === document.activeElement
        ? css.labelTopFocus
        : input ? css.labelTopBlur : css.labelMiddle;
}

async function register(name, email, pwd, confPwd, csrfToken, accessToken, setFormError, setStep) {
    const data = {name, email, pwd, confPwd};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        useAbortController: true
    };

    const response = await axios.post('/api/user/register', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 202:
            setStep('verification');
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

export default {inputEffect, register};