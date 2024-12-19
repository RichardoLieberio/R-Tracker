import axios from '../services/axios';

import store from '../redux/store';
import {setUsers} from '../redux/dataSlice';

async function getAllUsers(accessToken) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        useAbortController: true,
        authenticated: {
            codes: [401],
            route: '/login'
        },
        adminRequest: {
            codes: [403],
            route: '/'
        }
    };

    const response = await axios.get('/api/admin/user', config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setUsers(response.data.users));
            break;
    }
}

export default {getAllUsers};