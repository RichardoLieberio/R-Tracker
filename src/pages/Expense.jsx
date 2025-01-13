import {useState, useEffect, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import months from '../../config/months';
import days from '../../config/days';
import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';
import {addProcess, deleteProcess} from '../redux/expensePageSlice';

import {
    getBgPrimaryColor,
    getTextNeutralColor, getOppositeTextColor,
    getHoverBgHighlightColor
} from '../css/color';

import contr from '../controllers/expense';

import {HelmetProvider} from 'react-helmet-async';
import {FaRegCalendarAlt} from 'react-icons/fa';
import ExpenseAndChartHead from '../head/ExpenseAndChartHead';
import CalendarSetting from '../components/CalendarSetting';
import ExpenseCalendar from '../components/ExpenseCalendar';
import ExpenseSection from '../components/ExpenseSection';
import AddExpenseModal from '../components/AddExpenseModal';
import EditExpenseModal from '../components/EditExpenseModal';
import ExpenseModal from '../components/ExpenseModal';
import CalendarModal from '../components/CalendarModal';
import Skeleton from '../components/Skeleton';

export default function Expense() {
    const [csrfToken, setCSRFToken] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [addExpense, setAddExpense] = useState(false);
    const [editExpense, setEditExpense] = useState(false);
    const [showExpense, setShowExpense] = useState(false);

    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');
    const [newExpenseDate, setNewExpenseDate] = useState('');
    const [newExpenseCategory, setNewExpenseCategory] = useState({});
    const [newExpenseError, setNewExpenseError] = useState({});
    const [proccessingNewExpense, setProccessingNewExpense] = useState(false);

    const [editExpenseError, setEditExpenseError] = useState({});

    const location = useLocation();

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const expenses = useSelector((state) => state.data.expenses);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const year = useSelector((state) => state.expensePage.year);
    const month = useSelector((state) => state.expensePage.month);
    const expenseDate = useSelector((state) => state.expensePage.expenseDate);
    const expense = useSelector((state) => state.expensePage.expense);
    const processing = useSelector((state) => state.expensePage.processing);

    const dispatch = useDispatch();

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

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

    useEffect(function() {
        setShowCalendar(false);
    }, [phoneBreakpoint, desktopBreakpoint]);

    const displayExpense = useMemo(function() {
        if (!expenses || !expenseCategories) return null;

        const categories = expenseCategories.reduce((obj, {_id, name, color, icon}) => ({...obj, [_id]: {name, color, icon}}), {});

        return Object.keys(expenses)
            .filter(expenseDate => {
                const [, expenseMonth, expenseYear] = expenseDate.split('/');
                return +expenseMonth === month + 1 && +expenseYear === year;
            })
            .sort((a, b) => +b.split('/')[0] - +a.split('/')[0])
            .map(expenseDate => {
                const [date, month, year] = expenseDate.split('/');
                const displayMonth = phoneBreakpoint ? months[+month - 1] : months[+month - 1].slice(0, 3);
                const displayDay = desktopBreakpoint ? days[new Date(year, month - 1, date).getDay()] : days[new Date(year, month - 1, date).getDay()].slice(0, 3)
                return {
                    date: `${displayMonth} ${date} \u00A0\u00A0 ${displayDay}`,
                    amount: expenses[expenseDate].reduce((total, {amount}) => total + amount, 0),
                    expenses: expenses[expenseDate].map(expense => ({...expense, category: categories[expense.category_id]}))
                };
            });
    }, [month, year, expenses, expenseCategories, phoneBreakpoint, desktopBreakpoint]);

    const calendarExpense = useMemo(function() {
        if (!expenseDate || !expenses || !expenses[expenseDate]) return null;


        const [date, month, year] = expenseDate.split('/');
        const categories = expenseCategories.reduce((obj, {_id, name, color, icon}) => ({...obj, [_id]: {name, color, icon}}), {});

        const displayMonth = months[+month - 1];
        const displayDay = desktopBreakpoint ? days[new Date(year, month - 1, date).getDay()] : days[new Date(year, month - 1, date).getDay()].slice(0, 3)

        return {
            date: desktopBreakpoint ? `${displayMonth} ${date} \u00A0\u00A0 ${displayDay}` : `${displayMonth} ${date}`,
            amount: expenses[expenseDate].reduce((total, {amount}) => total + amount, 0),
            expenses: expenses[expenseDate].map(expense => ({...expense, category: categories[expense.category_id]}))
        };
    }, [expenses, expenseDate, expenseCategories, desktopBreakpoint]);

    async function addHandler() {
        if (!proccessingNewExpense) {
            setProccessingNewExpense(true);
            setNewExpenseError({});
            await contr.createExpense(newExpenseName, +newExpenseAmount, newExpenseDate, newExpenseCategory?._id, csrfToken, accessToken, setNewExpenseError, resetAddExpenseModal);
            setProccessingNewExpense(false);
        }
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

    function resetAddExpenseModal() {
        setAddExpense(false);
        setNewExpenseName('');
        setNewExpenseAmount('');
        setNewExpenseDate('');
        setNewExpenseCategory({});
    }

    return (
        <HelmetProvider>
            <ExpenseAndChartHead />
            <section className="w-5/6 mx-auto py-8 pb-16 flex flex-col desktop:flex-row justify-center gap-4 desktop:gap-24">
                {
                    desktopBreakpoint
                    ? <section className="w-fit flex flex-col gap-8 shrink-0">
                        <div className="flex items-center justify-between">
                            <CalendarSetting arrow={true} />
                        </div>
                        <ExpenseCalendar />
                        <div className="w-[496px] mx-auto">
                            {calendarExpense && <ExpenseSection expense={calendarExpense} setModal={setShowExpense} />}
                        </div>
                    </section>
                    : <div className="w-full max-w-96 tablet:w-3/5 tablet:max-w-none mx-auto flex items-center justify-between">
                        <CalendarSetting />
                        {phoneBreakpoint && <FaRegCalendarAlt onClick={() => setShowCalendar(true)} className="text-xl cursor-pointer" />}
                    </div>
                }
                <section className="w-full max-w-96 tablet:w-3/5 tablet:max-w-none desktop:w-1/3 desktop:min-w-96 desktop:max-w-none mx-auto desktop:mx-0 flex flex-col gap-12">
                    <header className="flex flex-col-reverse phone:flex-row phone:items-center phone:justify-between gap-4">
                        <div className="flex items-center gap-2 phone:flex-col phone:items-start phone:gap-0 overflow-hidden">
                            <span className={`text-xs ${getTextNeutralColor(theme)}`}>Expenses:</span>
                            <span className="w-full text-xl truncate">
                                {
                                    displayExpense
                                    ? displayExpense.reduce((total, {amount}) => total + amount, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    : <div className="w-24">
                                        <Skeleton className="h-5" />
                                    </div>
                                }
                            </span>
                        </div>
                        <button onClick={() => setAddExpense(true)} className={`w-full phone:w-fit h-fit py-1 px-8 relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} shrink-0`}>Add expense</button>
                    </header>
                    <main className="flex flex-col gap-4">
                        {
                            displayExpense
                            ? displayExpense.map(expense => <ExpenseSection key={expense.date} expense={expense} setModal={setShowExpense} />)
                            : Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="w-full h-14 gap-4" />)
                        }
                    </main>
                </section>
            </section>
            <CalendarModal modal={showCalendar} setModal={setShowCalendar} expense={calendarExpense} setShowExpense={setShowExpense} />
            <AddExpenseModal modal={addExpense} setModal={setAddExpense} name={newExpenseName} setName={setNewExpenseName} amount={newExpenseAmount} setAmount={setNewExpenseAmount} date={newExpenseDate} setDate={setNewExpenseDate} category={newExpenseCategory} setCategory={setNewExpenseCategory} error={newExpenseError} processing={proccessingNewExpense} submit={addHandler} />
            <EditExpenseModal modal={editExpense} setModal={setEditExpense} error={editExpenseError[expense?._id] || {}} removeError={removeError} submit={editHandler} />
            <ExpenseModal modal={showExpense} setModal={setShowExpense} expense={expense} setEditModal={setEditExpense} deleteHandler={deleteHandler} />
        </HelmetProvider>
    );
}