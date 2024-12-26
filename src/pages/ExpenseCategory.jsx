import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';

import {HelmetProvider} from 'react-helmet-async';
import ExpenseCategoryHead from '../head/ExpenseCategoryHead';

export default function ExpenseCategory() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(function() {
        getToast();
        dispatch(changePage(location.pathname));

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <HelmetProvider>
            <ExpenseCategoryHead />
            <h1>Expense Category Page</h1>
        </HelmetProvider>
    );
}