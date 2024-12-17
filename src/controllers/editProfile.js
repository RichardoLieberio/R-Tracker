import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import store from '../redux/store';
import {setName} from '../redux/authSlice';

import css from '../css/editProfile';

function inputErrorHandler(theme, error, value, setLabelClass, setInputClass, pwd=false) {
    if (error) {
        setLabelClass(value ? css(theme).labelTopError : css(theme).labelMiddleError);
        setInputClass(pwd ? css(theme).pwdInputError : css(theme).defaultInputError);
    } else {
        setLabelClass(value ? css(theme).labelTopBlur : css(theme).labelMiddle);
        setInputClass(pwd ? css(theme).pwdInput : css(theme).defaultInput);
    }
}

async function changeName(name, csrfToken, accessToken, setNameError, setNewName, originalName, navigate) {
    if (name === originalName) return setNewName('');

    const data = {name};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            navigate,
            code: 401,
            route: '/login',
            options: {replace: true}
        }
    };

    const response = await axios.patch('/api/user/change-name', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setName(response.data.name));
            toast.success(response.data.msg);
            setNewName('');
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 422:
            setNameError(response.data.msg);
            toast.error('Failed to update name.');
            break;
    }
}

export default {inputErrorHandler, changeName};