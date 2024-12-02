import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import css from '../css/forgotPwdEmail';

function inputErrorHandler(error, value, label, input) {
    if (error) {
        label.current.className = value ? css.labelTopError : css.labelMiddleError;
        input.current.className = css.defaultInputError;
    } else {
        label.current.className = value ? css.labelTopBlur : css.labelMiddle;
        input.current.className = css.defaultInput;
    }
}

async function requestResetPwd(email, csrfToken, accessToken, setFormError, setStep) {
    const data = {email};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        useAbortController: true
    };

    const response = await axios.post('/api/request/reset-password', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            setStep('form');
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

export default {inputErrorHandler, requestResetPwd};