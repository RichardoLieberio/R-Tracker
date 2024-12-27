import {toast} from 'react-toastify';
import axios from '../services/axios';

import store from '../redux/store';
import {setExpenseCategories, addExpenseCategory} from '../redux/dataSlice';

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
            store.dispatch(addExpenseCategory(response.data.data));
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

export default {inputErrorHandler, getCategories, addCategory};