import {toast} from 'react-toastify';
import axios from '../services/axios';

import store from '../redux/store';
import {setUsers, deleteUser} from '../redux/dataSlice';
import {clearUser, addProcess, deleteProcess} from '../redux/userPageSlice';

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

async function deleteUserAccount(id, csrfToken, accessToken) {
    store.dispatch(addProcess(id));

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401],
            route: '/login'
        },
        adminRequest: {
            codes: [403],
            route: '/admin/user'
        }
    };

    const response = await axios.delete(`/api/admin/user/${id}`, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(deleteUser(response.data.userId));
            store.dispatch(clearUser(response.data.userId));
            break;
        case 400:
            toast.error(response.data.msg);
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteUser(response.data.userId));
            store.dispatch(clearUser(response.data.userId));
            break;
    }

    store.dispatch(deleteProcess(id));
}

export default {getAllUsers, deleteUserAccount};