import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import {setAccessToken, setUserInfo} from '../redux/authSlice';

async function resendOtp(name, email, pwd, confPwd, csrfToken, accessToken, setFormError, setStep) {
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
            toast.success('Verification email sent. Please check your inbox or spam folder.');
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
            setStep('register');
            break;
    }
}

async function verify(email, otp, csrfToken, accessToken, setFormError, setOtpError, setStep, dispatch) {
    const data = {email, otp};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        useAbortController: true
    };

    const response = await axios.post('/api/user/verify', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 201:
            dispatch(setAccessToken(response.data.accessToken));
            dispatch(setUserInfo(response.data.user));
            setStep('verified');
            break;
        case 400:
            setOtpError(response.data.msg);
            break;
        case 401:
            toast.error(response.data.msg);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            if (response.data.msg.email) {
                setFormError({email: response.data.msg.email});
                setStep('register');
            } else if (response.data.msg.otp) {
                setOtpError(response.data.msg.otp);
            }
            break;
    }
}

export default {resendOtp, verify};