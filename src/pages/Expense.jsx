import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import months from '../../config/months';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';
import {prevMonth, nextMonth} from '../redux/expensePageSlice';

import {getTextNeutralColor} from '../css/color';

import contr from '../controllers/expense';

import {HelmetProvider} from 'react-helmet-async';
import {TiArrowSortedDown} from 'react-icons/ti';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';
import ExpenseHead from '../head/ExpenseHead';
import ExpenseCalendar from '../components/ExpenseCalendar';

export default function Expense() {
    const [csrfToken, setCSRFToken] = useState('');

    const location = useLocation();

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const expenses = useSelector((state) => state.data.expenses);
    const year = useSelector((state) => state.expensePage.year);
    const month = useSelector((state) => state.expensePage.month);

    const dispatch = useDispatch();

    useEffect(function() {
        getToast();
        dispatch(changePage(location.pathname));

        getCSRFToken(setCSRFToken);
        !expenses && contr.getExpenses(accessToken);

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <HelmetProvider>
            <ExpenseHead />
            <section className="w-fit mx-auto py-8 pb-16 flex flex-col desktop:flex-auto gap-12 desktop:gap-24">
                <section className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <span className="flex items-center gap-2 cursor-pointer">{year} <TiArrowSortedDown /></span>
                            <span className="flex items-center gap-2 cursor-pointer">{months[month].slice(0, 3)} <TiArrowSortedDown /></span>
                        </div>
                        <div className="flex items-center gap-8">
                            <span onClick={() => dispatch(prevMonth())} className={`p-1 text-2xl ${year === +process.env.START_YEAR && month === 0 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowLeftSLine /></span>
                            <span onClick={() => dispatch(nextMonth())} className={`p-1 text-2xl ${year === new Date().getFullYear() && month === 11 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowRightSLine /></span>
                        </div>
                    </div>
                    {expenses && <ExpenseCalendar />}
                </section>
            </section>
        </HelmetProvider>
    );
}