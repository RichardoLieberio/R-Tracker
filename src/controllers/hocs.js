import Cookies from 'js-cookie';

import axios from '../services/axios';

import store from '../redux/store';
import {changeTheme} from '../redux/webSlice';
import {setUserInfo, setAuthentication} from '../redux/authSlice';

function themeSetup() {
    const theme = Cookies.get('theme');
    store.dispatch(changeTheme(theme));
    Cookies.set('theme', theme ?? 'purple');
}

async function getInfo(setLoading, useAuthenticated, accessToken='') {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    };

    if (useAuthenticated) config.authenticated = {
        code: 401,
        route: '/login'
    };

    const response = await axios.get('/api/user/info', config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setUserInfo(response.data.userInfo));
            store.dispatch(setAuthentication(true));
            setLoading(false);
            break;
        case 401:
            setLoading(false);
            break;
    }
}

export default {themeSetup, getInfo};