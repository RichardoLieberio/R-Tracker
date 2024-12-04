import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {axiosController} from '../services/axios';

import {HelmetProvider} from 'react-helmet-async';
import ExpenseHead from '../head/ExpenseHead';

export default function Expense() {
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    return (
        <HelmetProvider>
            <ExpenseHead />
            <h1>Expense Page</h1>
            <p>{accessToken}</p>
        </HelmetProvider>
    );
}