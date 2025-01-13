import {useState, useEffect, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import themes from '../../config/theme';
import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';

import contr from '../controllers/chart';

import {HelmetProvider} from 'react-helmet-async';
import ExpenseAndChartHead from '../head/ExpenseAndChartHead';
import CalendarSetting from '../components/CalendarSetting';
import ExpensePieChart from '../components/ExpensePieChart';
import ExpenseList from '../components/ExpenseList';
import ChartModal from '../components/ChartModal';

export default function Chart() {
    const [csrfToken, setCSRFToken] = useState('');
    const [expense, setExpense] = useState({});
    const [chartModal, setChartModal] = useState(false);

    const theme = useSelector((state) => state.web.theme);
    const expenses = useSelector((state) => state.data.expenses);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const month = useSelector((state) => state.chartPage.month);
    const year = useSelector((state) => state.chartPage.year);

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

    function openChartModal(name, amount, expenses) {
        setExpense({name, amount, expenses});
        setChartModal(true);
    }

    const data = useMemo(function() {
        if (!expenses || !expenseCategories) return;

        const categories = expenseCategories.reduce((obj, {_id, name, color, icon}) => ({...obj, [_id]: {name, color, icon}}), {});
        const data = Object.values(expenses).reduce((obj, expenses) => {
            expenses.map(expense => {
                const expenseDate = new Date(expense.expense_date);
                if (expenseDate.getMonth() !== month || expenseDate.getFullYear() !== year) return;

                if (!obj[expense.category_id]) obj[expense.category_id] = {...categories[expense.category_id], expenses: [], amount: 0};
                const {name, color, icon} = categories[expense.category_id];
                obj[expense.category_id].expenses.push({...expense, category: {name, color, icon}});
                obj[expense.category_id].amount += expense.amount;
            });
            return obj;
        }, {});

        return {
            data,
            chart: Object.values(data).reduce((obj, {amount, name, color}) => [...obj, {value: amount, label: name, color: `#${color}`}], []),
            total: Object.values(data).reduce((total, {amount}) => total + amount, 0)
        };
    }, [expenses, expenseCategories, month, year]);

    return (
        <HelmetProvider>
            <ExpenseAndChartHead />
            <section className="w-1/2 min-w-56 phone:min-w-72 tablet:w-fit mx-auto py-8 pb-16 flex flex-col gap-12">
                <div className="w-full max-w-96 flex items-center justify-between">
                    <CalendarSetting arrow={phoneBreakpoint} chartPage />
                </div>
                <ExpensePieChart chart={data?.chart.length ? data.chart : [{value: 1, label: 'No data', color: themes[theme].neutral}]} total={data?.total ?? 0} />
                <section className="flex flex-col">
                    {
                        Object.values(data?.data ?? {}).map(({name, color, icon, amount, expenses}, i) => (
                            <ExpenseList key={i} openModal={openChartModal} name={name} color={color} icon={icon} amount={amount} expenses={expenses} total={data.total} />
                        ))
                    }
                </section>
                <ChartModal modal={chartModal} setModal={setChartModal} expense={expense} />
            </section>
        </HelmetProvider>
    );
}