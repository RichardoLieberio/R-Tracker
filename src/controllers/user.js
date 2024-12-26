import {toast} from 'react-toastify';
import axios from '../services/axios';

import store from '../redux/store';
import {setUsers, addBlacklist, removeBlacklist, deleteUser} from '../redux/dataSlice';
import {clearUser, checkAndAddBlacklist, checkAndRemoveBlacklist} from '../redux/userPageSlice';

import css from '../css/user';

function inputErrorHandler(theme, error, value, setLabelClass, setInputClass, pwd=false) {
    if (error) {
        setLabelClass(value ? css(theme).labelTopError : css(theme).labelMiddleError);
        setInputClass(pwd ? css(theme).pwdInputError : css(theme).defaultInputError);
    } else {
        setLabelClass(value ? css(theme).labelTopBlur : css(theme).labelMiddle);
        setInputClass(pwd ? css(theme).pwdInput : css(theme).defaultInput);
    }
}

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

async function blockToken(id, csrfToken, accessToken) {
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

    const response = await axios.patch(`/api/admin/user/${id}/block-token`, {}, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            break;
        case 400:
            toast.error(response.data.msg);
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteUser(id));
            store.dispatch(clearUser(id));
            break;
    }
}

async function blacklistUser(id, reason, csrfToken, accessToken, setBlacklistModal, setBlacklistError) {
    const data = {reason};
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

    const response = await axios.patch(`/api/admin/user/${id}/blacklist`, data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(addBlacklist(response.data.data));
            store.dispatch(checkAndAddBlacklist(response.data.data));
            store.getState().userPage.user._id === id && setBlacklistModal(false);
            break;
        case 400:
            toast.error(response.data.msg);
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteUser(id));
            store.dispatch(clearUser(id));
            break;
        case 422:
            setBlacklistError(response.data.msg);
            toast.error(response.data.msg.reason);
            break;
    }
}

async function whitelistUser(id, csrfToken, accessToken, setWhitelistModal) {
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

    const response = await axios.patch(`/api/admin/user/${id}/whitelist`, {}, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(removeBlacklist(response.data.userId));
            store.dispatch(checkAndRemoveBlacklist(response.data.userId));
            store.getState().userPage.user._id === id && setWhitelistModal(false);
            break;
        case 400:
            toast.error(response.data.msg);
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteUser(id));
            store.dispatch(clearUser(id));
            break;
    }
}

async function deleteUserAccount(id, csrfToken, accessToken) {
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
            store.dispatch(deleteUser(id));
            store.dispatch(clearUser(id));
            break;
    }
}

export default {inputErrorHandler, getAllUsers, blockToken, blacklistUser, whitelistUser, deleteUserAccount};