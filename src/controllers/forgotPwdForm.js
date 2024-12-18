import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

async function resendOtp(email, csrfToken, accessToken, setFormError) {
    const data = {email};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        }
    };

    const response = await axios.post('/api/request/reset-password', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
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

async function resetPwd(email, otp, pwd, confPwd, csrfToken, accessToken, setFormError, navigate) {
    const data = {email, otp, pwd, confPwd};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        }
    };

    const response = await axios.patch('/api/user/reset-password', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            setToast('success', response.data.msg);
            navigate('/login');
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
        case 404:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            setFormError(response.data.msg);
            break;
    }
}

export default {resendOtp, resetPwd};