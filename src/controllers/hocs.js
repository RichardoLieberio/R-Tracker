import axios from '../services/axios';

import store from '../redux/store';
import {setUserInfo, setAuthentication} from '../redux/authSlice';

async function getInfo(accessToken, setLoading) {
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
            setLoading(false);
            break;
    }
}

export default {getInfo};