import Cookies from 'js-cookie';

import axios from '../services/axios';
import {setToast} from '../services/toastService';
import logout from '../services/logout';

import store from '../redux/store';
import {changeTheme as reduxChangeTheme} from '../redux/webSlice';

async function signout(navigate) {
    const config = {
        headers: {'Content-Type': 'application/json'},
        useAbortController: true
    };

    const response = await axios.post('/api/auth/logout', {}, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            logout();
            setToast('success', response.data.msg);
            navigate('/login', {replace: true});
            break;
    }
}

function changeTheme(theme) {
    store.dispatch(reduxChangeTheme(theme));
    Cookies.set('theme', theme);
}

export default {changeTheme, signout};