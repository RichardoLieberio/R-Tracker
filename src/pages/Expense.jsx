import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';

import {changePage} from '../redux/webSlice';

import {HelmetProvider} from 'react-helmet-async';
import ExpenseHead from '../head/ExpenseHead';

export default function Expense() {
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(function() {
        dispatch(changePage(location.pathname));

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <HelmetProvider>
            <ExpenseHead />
            <h1>Expense Page</h1>
        </HelmetProvider>
    );
}