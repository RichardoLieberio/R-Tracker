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
import {addProcess, deleteProcess} from '../redux/expensePageSlice';
import {setExpense} from '../redux/chartPageSlice';

import contr from '../controllers/chart';

import {HelmetProvider} from 'react-helmet-async';
import ExpenseAndChartHead from '../head/ExpenseAndChartHead';
import CalendarSetting from '../components/CalendarSetting';
import ExpensePieChart from '../components/ExpensePieChart';
import ExpenseList from '../components/ExpenseList';
import ChartModal from '../components/ChartModal';
import ExpenseModal from '../components/ExpenseModal';
import EditExpenseModal from '../components/EditExpenseModal';

export default function Chart() {
    const [csrfToken, setCSRFToken] = useState('');
    const [showExpense, setShowExpense] = useState(false);
    const [chartExpense, setChartExpense] = useState({});
    const [chartModal, setChartModal] = useState(false);

    const [editExpense, setEditExpense] = useState(false);
    const [editExpenseError, setEditExpenseError] = useState({});

    const theme = useSelector((state) => state.web.theme);
    const expenses = useSelector((state) => state.data.expenses);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const month = useSelector((state) => state.chartPage.month);
    const year = useSelector((state) => state.chartPage.year);
    const expense = useSelector((state) => state.chartPage.expense);
    const processing = useSelector((state) => state.expensePage.processing);

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

    function openChartModal(_id, name, amount, expenses) {
        setChartExpense({_id, name, amount, expenses});
        setChartModal(true);
    }

    function openExpenseModal(expense) {
        dispatch(setExpense(expense));
        setShowExpense(true);
    }

    async function editHandler(id, name, amount, date, category) {
        if (!processing.includes(id)) {
            dispatch(addProcess(id));
            removeError(id);
            await contr.editExpense(id, name, +amount, date, category, csrfToken, accessToken, setEditExpenseError, setEditExpense, setShowExpense);
            dispatch(deleteProcess(id));
        }
    }

    async function deleteHandler() {
        if (!processing.includes(expense?._id)) {
            dispatch(addProcess(expense._id));
            await contr.deleteExpense(expense._id, csrfToken, accessToken, setShowExpense);
            dispatch(deleteProcess(expense._id));
        }
    }

    function removeError(id) {
        const newError = {...editExpenseError};
        delete newError[id];
        setEditExpenseError({...newError});
    }

    const data = useMemo(function() {
        if (!expenses || !expenseCategories) return;

        const categories = expenseCategories.reduce((obj, {_id, name, color, icon}) => ({...obj, [_id]: {name, color, icon}}), {});
        const data = Object.values(expenses).reduce((obj, expenses) => {
            expenses.map(expense => {
                const expenseDate = new Date(expense.expense_date);
                if (expenseDate.getMonth() !== month || expenseDate.getFullYear() !== year) return;

                const category = categories[expense.category_id] ? expense.category_id : 'undefined';
                const {name, color, icon} = categories[category] || {name: 'Category not found', color: themes[theme].neutral.replace('#', '')};
                if (!obj[category]) obj[category] = {name, color, icon, expenses: [], amount: 0};
                obj[category].expenses.push({...expense, category: {name, color, icon}});
                obj[category].amount += expense.amount;
            });
            return obj;
        }, {});

        return {
            data,
            chart: Object.values(data).reduce((obj, {amount, name, color}) => [...obj, {value: amount, label: name, color: `#${color}`}], []),
            total: Object.values(data).reduce((total, {amount}) => total + amount, 0)
        };
    }, [expenses, expenseCategories, month, year, theme]);

    useEffect(function() {
        if (chartModal && Object.keys(chartExpense).length) {
            const expenses = data?.data[chartExpense._id]?.expenses || [];
            if (expenses.length) {
                const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
                setChartExpense({...chartExpense, amount, expenses});
            } else {
                setChartModal(false);
            }
        }
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

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
                        Object.entries(data?.data ?? {}).map(([id, {name, color, icon, amount, expenses}]) => (
                            <ExpenseList key={id} openModal={openChartModal} id={id} name={name} color={color} icon={icon} amount={amount} expenses={expenses} total={data.total} />
                        ))
                    }
                </section>
                <ChartModal modal={chartModal} setModal={setChartModal} expense={chartExpense} openExpenseModal={openExpenseModal} />
                <ExpenseModal modal={showExpense} setModal={setShowExpense} expense={expense} setEditModal={setEditExpense} deleteHandler={deleteHandler} />
                <EditExpenseModal modal={editExpense} setModal={setEditExpense} expense={expense} error={editExpenseError[expense?._id] || {}} removeError={removeError} submit={editHandler} />
            </section>
        </HelmetProvider>
    );
}