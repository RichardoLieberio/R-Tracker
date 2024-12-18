import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

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

export default {register};