import {toast} from 'react-toastify';
import axios from '../services/axios';

import store from '../redux/store';
import {setExpenseCategories, addExpenseCategory, updateExpenseCategory, deleteExpenseCategory} from '../redux/dataSlice';

import css from '../css/expenseCategory';

function inputErrorHandler(theme, error, value, setLabelClass, setInputClass, color=false) {
    if (error) {
        setLabelClass(value ? css(theme).labelTopError : css(theme).labelMiddleError);
        setInputClass(color ? css(theme).colorInputError : css(theme).defaultInputError);
    } else {
        setLabelClass(value ? css(theme).labelTopBlur : css(theme).labelMiddle);
        setInputClass(color ? css(theme).colorInput : css(theme).defaultInput);
    }
}

async function getCategories(accessToken) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        authenticated: {
            codes: [401],
            route: '/login'
        }
    };

    const response = await axios.get('/api/expense/categories', config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setExpenseCategories(response.data.categories));
            break;
    }
}

async function addCategory(name, setName, color, setColor, icon, setIcon, csrfToken, accessToken, setModal, setError) {
    const data = {name, color, icon};
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
            route: '/admin/expense-category'
        }
    };

    const response = await axios.post('/api/admin/expense-category', data, config);
    const status = response?.data?.status;

    switch (status) {
        case 201:
            toast.success(response.data.msg);
            store.dispatch(addExpenseCategory({data: response.data.data, name: store.getState().auth.userInfo.name}));
            setModal(false);
            setName('');
            setColor('');
            setIcon('');
            break;
        case 422:
            setError(response.data.msg);
            toast.error('Add category failed');
            break;
    }
}

async function editCategory(id, name, color, icon, iconText, csrfToken, accessToken, setError) {
    const data = {name, color, icon: iconText !== null ? icon : undefined};
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
            route: '/admin/expense-category'
        }
    };

    const response = await axios.put(`/api/admin/expense-category/${id}`, data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(updateExpenseCategory(response.data.data));
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteExpenseCategory(id));
            break;
        case 422:
            const {name: nameMsg, color: colorMsg, icon: iconMsg} = response.data.msg;
            const error = {
                name: {msg: nameMsg, value: name},
                color: {msg: colorMsg, value: color},
                icon: {msg: iconMsg, value: icon},
                iconText
            };
            setError(value => ({...value, [id]: error}));
            toast.error('Add category failed');
            break;
    }
}

async function hideCategory(id, csrfToken, accessToken) {
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
            route: '/admin/expense-category'
        }
    };

    const response = await axios.patch(`/api/admin/expense-category/${id}/hide`, {}, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(updateExpenseCategory(response.data.data));
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteExpenseCategory(id));
            break;
    }
}

async function unhideCategory(id, csrfToken, accessToken) {
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
            route: '/admin/expense-category'
        }
    };

    const response = await axios.patch(`/api/admin/expense-category/${id}/unhide`, {}, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(updateExpenseCategory(response.data.data));
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteExpenseCategory(id));
            break;
    }
}

async function deleteCategory(id, csrfToken, accessToken) {
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
            route: '/admin/expense-category'
        }
    };

    const response = await axios.delete(`/api/admin/expense-category/${id}`, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(deleteExpenseCategory(response.data.id));
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(deleteExpenseCategory(id));
            break;
    }
}

export default {inputErrorHandler, getCategories, addCategory, editCategory, hideCategory, unhideCategory, deleteCategory};