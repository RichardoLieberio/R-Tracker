import {toast} from 'react-toastify';

import axios from '../services/axios';

import store from '../redux/store';
import {setExpenses, updateExpense, removeExpense, setExpenseCategories} from '../redux/dataSlice';
import {setExpense} from '../redux/chartPageSlice';

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
            store.getState().chartPage.expense._id === response.data.id && setModal(false);
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(removeExpense(id));
            store.getState().chartPage.expense._id === id && setModal(false);
            break;
    }
}

async function editExpense(id, expense, amount, expenseDate, category, csrfToken, accessToken, setError, setEditModal, setShowModal) {
    const data = {expense, amount, expenseDate, category};
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

    const response = await axios.put(`/api/expense/${id}`, data, config);
    const status = response?.data?.status;

    switch (status) {
        case 200:
            store.dispatch(updateExpense(response.data.expense));
            toast.success(response.data.msg);
            if (store.getState().chartPage.expense._id === id) {
                setEditModal(false);
                setShowModal(false);
                const {_id, name, color, icon} = response.data.expense.category_id;
                const newExpense = {...response.data.expense, category: {name, color, icon}};
                newExpense.category_id = _id;
                store.dispatch(setExpense(newExpense));
            }
            break;
        case 403:
            setToast('error', response.data.msg);
            location.reload();
            break;
        case 404:
            toast.error(response.data.msg);
            store.dispatch(removeExpense(id));
            if (store.getState().chartPage.expense._id === id) {
                setEditModal(false);
                setShowModal(false);
            }
            break;
        case 422:
            const {expense: expenseMsg, amount: amountMsg, expenseDate: expenseDateMsg, category: categoryMsg} = response.data.msg;
            const error = {
                expense: {msg: expenseMsg, value: expense},
                amount: {msg: amountMsg, value: amount.toString()},
                expenseDate: {msg: expenseDateMsg, value: expenseDate},
                category: {msg: categoryMsg, value: category}
            };
            setError(value => ({...value, [id]: error}));
            toast.error('Edit expense failed');
            break;
    }
}

export default {getExpenses, getExpenseCategory, deleteExpense, editExpense};