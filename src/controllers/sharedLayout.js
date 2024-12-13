import axios from '../services/axios';
import {setToast} from '../services/toastService';

import store from '../redux/store';
import {logout} from '../redux/authSlice';

async function signout(navigate) {
    const config = {
        headers: {'Content-Type': 'application/json'},
        useAbortController: true
    };

    const response = await axios.post('/api/auth/logout', config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(logout());
            setToast('success', response.data.msg);
            navigate('/login', {replace: true});
            break;
    }
}

export default {signout};