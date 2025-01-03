import {toast} from 'react-toastify';

import axios from '../services/axios';
import {setToast} from '../services/toastService';

import store from '../redux/store';
import {setExpenses, removeExpense, setExpenseCategories} from '../redux/dataSlice';

async function getExpenses(accessToken) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        useAbortController: true,
        authenticated: {
            codes: [401],
            route: '/login'
        }
    };

    const response = await axios.get('/api/expense', config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(setExpenses(response.data.expenses));
            break;
    }
}

async function getExpenseCategory(accessToken) {
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

async function deleteExpense(id, csrfToken, accessToken, setModal) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'CSRF-Token': csrfToken
        },
        authenticated: {
            codes: [401],
            route: '/login'
        }
    };

    const response = await axios.delete(`/api/expense/${id}`, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            toast.success(response.data.msg);
            store.dispatch(removeExpense(response.data.id));
            store.getState().expensePage.expense._id === response.data.id && setModal(false);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(removeExpense(id));
            store.getState().expensePage.expense._id === id && setModal(false);
            break;
    }
}

export default {getExpenses, getExpenseCategory, deleteExpense};