import axios from '../services/axios';

import store from '../redux/store';
import {clearAccessToken, setUserInfo, clearUserInfo, setAuthentication} from '../redux/authSlice';

async function getInfo(setLoading, accessToken='') {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
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
            store.dispatch(clearAccessToken());
            store.dispatch(clearUserInfo());
            store.dispatch(setAuthentication(false));
            setLoading(false);
            break;
    }
}

export default {getInfo};