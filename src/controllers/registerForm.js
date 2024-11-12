import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import css from '../css/registerForm';

function showError(error, name, nameLabelRef, nameInputRef, email, emailLabelRef, emailInputRef, pwd, pwdLabelRef, pwdInputRef, confPwd, confPwdLabelRef, confPwdInputRef) {
    if (error.name) {
        nameLabelRef.current.className = name ? css.labelTopError : css.labelMiddleError;
        nameInputRef.current.className = css.defaultInputError;
    }

    if (error.email) {
        emailLabelRef.current.className = email ? css.labelTopError : css.labelMiddleError;
        emailInputRef.current.className = css.defaultInputError;
    }

    if (error.pwd) {
        pwdLabelRef.current.className = pwd ? css.labelTopError : css.labelMiddleError;
        pwdInputRef.current.className = css.pwdInputError;
    }

    if (error.confPwd) {
        confPwdLabelRef.current.className = confPwd ? css.labelTopError : css.labelMiddleError;
        confPwdInputRef.current.className = css.pwdInputError;
    }
}

function revertForm(name, nameLabelRef, nameInputRef, email, emailLabelRef, emailInputRef, pwd, pwdLabelRef, pwdInputRef, confPwd, confPwdLabelRef, confPwdInputRef) {
    nameLabelRef.current.className = name ? css.labelTopBlur : css.labelMiddle;
    nameInputRef.current.className = css.defaultInput;

    emailLabelRef.current.className = email ? css.labelTopBlur : css.labelMiddle;
    emailInputRef.current.className = css.defaultInput;

    pwdLabelRef.current.className = pwd ? css.labelTopBlur : css.labelMiddle;
    pwdInputRef.current.className = css.pwdInput;

    confPwdLabelRef.current.className = confPwd ? css.labelTopBlur : css.labelMiddle;
    confPwdInputRef.current.className = css.pwdInput;
}

async function register(name, email, pwd, confPwd, csrfToken, accessToken, stepHandler) {
    const data = {name, email, pwd, confPwd};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        }
    };

    const response = await axios.post('/api/user/register', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 202:
            stepHandler('verification');
            break;
        case 400:
            toast.error(response.data.msg);
            break;
        case 401:
            toast.error(response.data.msg);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            return response.data.msg;
    }
}

export default {showError, revertForm, register};