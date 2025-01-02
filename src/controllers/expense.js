// import {toast} from 'react-toastify';

import axios from '../services/axios';
// import {setToast} from '../services/toastService';

import store from '../redux/store';
import {setExpenses, setExpenseCategories} from '../redux/dataSlice';

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

export default {getExpenses, getExpenseCategory};