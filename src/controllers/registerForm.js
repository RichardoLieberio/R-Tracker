import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import css from '../css/registerForm';

function inputErrorHandler(error, value, label, input, pwd=false) {
    if (error) {
        label.current.className = value ? css.labelTopError : css.labelMiddleError;
        input.current.className = pwd ? css.pwdInputError : css.defaultInputError;
    } else {
        label.current.className = value ? css.labelTopBlur : css.labelMiddle;
        input.current.className = pwd ? css.pwdInput : css.defaultInput;
    }
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

export default {inputErrorHandler, register};