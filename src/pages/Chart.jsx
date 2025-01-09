import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';

import contr from '../controllers/chart';

import CalendarSetting from '../components/CalendarSetting';
import ExpensePieChart from '../components/ExpensePieChart';

export default function Chart() {
    const [csrfToken, setCSRFToken] = useState('');

    const expenses = useSelector((state) => state.data.expenses);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const accessToken = useSelector((state) => state.auth.accessToken);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(function() {
        getToast();
        dispatch(changePage(location.pathname));

        getCSRFToken(setCSRFToken);
        !expenses && contr.getExpenses(accessToken);
        !expenseCategories && contr.getExpenseCategory(accessToken);

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="w-1/2 min-w-56 phone:min-w-72 tablet:w-fit mx-auto py-8 pb-16 flex flex-col gap-12">
            <div className="w-full max-w-96 flex items-center justify-between">
                <CalendarSetting arrow={phoneBreakpoint} chartPage />
            </div>
            <ExpensePieChart />
            <h1>Hello</h1>
        </section>
    );
}