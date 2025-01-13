import Cookies from 'js-cookie';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import store from '../redux/store';
import {logout as authLogout} from '../redux/authSlice';
import {logout as dataLogout} from '../redux/dataSlice';
import {logout as expensePageLogout} from '../redux/expensePageSlice';
import {logout as chartPageLogout} from '../redux/chartPageSlice';
import {logout as userPageLogout} from '../redux/userPageSlice';
import {logout as categoryPageLogout} from '../redux/categoryPageSlice';
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
            store.dispatch(authLogout());
            store.dispatch(dataLogout());
            store.dispatch(expensePageLogout());
            store.dispatch(chartPageLogout());
            store.dispatch(userPageLogout());
            store.dispatch(categoryPageLogout());

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