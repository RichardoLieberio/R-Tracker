import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';
import logout from '../services/logout';

import store from '../redux/store';
import {setName, setEmail} from '../redux/authSlice';

import css from '../css/editProfile';

function inputErrorHandler(theme, error, value, setLabelClass, setInputClass, pwd=false) {
    if (error) {
        setLabelClass(value ? css(theme).labelTopError : css(theme).labelMiddleError);
        setInputClass(pwd ? css(theme).pwdInputError : css(theme).defaultInputError);
    } else {
        setLabelClass(value ? css(theme).labelTopBlur : css(theme).labelMiddle);
        setInputClass(pwd ? css(theme).pwdInput : css(theme).defaultInput);
    }
}

function inputEffect(theme, labelRef, inputRef, input, error) {
    inputRef.current.className = error ? css(theme).pwdInputError : css(theme).pwdInput;

    labelRef.current.className = error
    ? inputRef.current === document.activeElement
        ? css(theme).labelTopError
        : input ? css(theme).labelTopError : css(theme).labelMiddleError
    : inputRef.current === document.activeElement
        ? css(theme).labelTopFocus
        : input ? css(theme).labelTopBlur : css(theme).labelMiddle;
}

async function changeName(name, csrfToken, accessToken, setNameError, setNewName, originalName, setNameModal) {
    if (name === originalName) return setNameError({});

    const data = {name};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401, 404],
            route: '/login'
        }
    };

    const response = await axios.patch('/api/user/change-name', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setName(response.data.name));
            toast.success(response.data.msg);
            setNameModal(false);
            setNewName('');
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            setNameError(response.data.msg);
            break;
    }
}

async function requestChangeEmail(email, csrfToken, accessToken, setEmailError, originalEmail, setStep) {
    if (email === originalEmail) return setEmailError({});

    const data = {email};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401, 404],
            route: '/login'
        }
    };

    const response = await axios.post('/api/request/change-email', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            setStep('verification');
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            setEmailError(response.data.msg);
            break;
    }
}

async function resendOtp(email, csrfToken, accessToken, setEmailError, setStep) {
    const data = {email};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401, 404],
            route: '/login'
        }
    };

    const response = await axios.post('/api/request/change-email', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            setEmailError(response.data.msg);
            setStep('email');
            break;
    }
}

async function changeEmail(email, setNewEmail, setEmailError, otp, setOtp, setOtpError, csrfToken, accessToken, setStep, setEmailModal) {
    const data = {email, otp};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401, 404],
            route: '/login'
        }
    };

    const response = await axios.patch('/api/user/change-email', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setEmail(response.data.email));
            toast.success(response.data.msg);
            setEmailModal(false);
            setNewEmail('');
            setOtp('');
            setStep('email');
            break;
        case 400:
            toast.error(response.data.msg);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            if (response.data.msg.email) {
                setEmailError({email: response.data.msg.email});
                setStep('email');
            } else if (response.data.msg.otp) {
                setOtpError(response.data.msg.otp);
            }
            break;
    }
}

async function changePwd(oldPwd, setOldPwd, newPwd, setNewPwd, confPwd, setConfPwd, csrfToken, accessToken, setPwdError) {
    const data = {oldPwd, newPwd, confPwd};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401, 404],
            route: '/login'
        }
    };

    const response = await axios.patch('/api/user/change-password', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            setOldPwd('');
            setNewPwd('');
            setConfPwd('');
            break;
        case 400:
            toast.error(response.data.msg);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            setPwdError(response.data.msg);
            break;
    }
}

async function deactivate(csrfToken, accessToken, navigate) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401, 404],
            route: '/login'
        }
    };

    const response = await axios.delete('/api/user', config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            logout();
            setToast('success', response.data.msg);
            navigate('/login', {replace: true});
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
    }
}

export default {inputErrorHandler, inputEffect, changeName, requestChangeEmail, resendOtp, changeEmail, changePwd, deactivate};