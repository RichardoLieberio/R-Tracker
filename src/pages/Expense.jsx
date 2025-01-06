import {useState, useEffect, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import months from '../../config/months';
import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';
import {setYear, setMonth, prevMonth, nextMonth, addProcess, deleteProcess} from '../redux/expensePageSlice';

import {
    getBgPrimaryColor, getBackgroundColor,
    getTextColor, getTextNeutralColor, getOppositeTextColor,
    getHoverBgHighlightColor, getHoverBgNeutral50Color,
    getShadowColor,
    getScrollbarTrackBackground, getScrollbarThumbText
} from '../css/color';

import contr from '../controllers/expense';

import {HelmetProvider} from 'react-helmet-async';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {TiArrowSortedDown} from 'react-icons/ti';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';
import {FaRegCalendarAlt} from 'react-icons/fa';
import ExpenseHead from '../head/ExpenseHead';
import ExpenseCalendar from '../components/ExpenseCalendar';
import ExpenseSection from '../components/ExpenseSection';
import AddExpenseModal from '../components/AddExpenseModal';
import ExpenseModal from '../components/ExpenseModal';
import Skeleton from '../components/Skeleton';

export default function Expense() {
    const [csrfToken, setCSRFToken] = useState('');
    const [addExpense, setAddExpense] = useState(false);
    const [showExpense, setShowExpense] = useState(false);

    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');
    const [newExpenseDate, setNewExpenseDate] = useState('');
    const [newExpenseCategory, setNewExpenseCategory] = useState({});
    const [newExpenseError, setNewExpenseError] = useState({});
    const [proccessingNewExpense, setProccessingNewExpense] = useState(false);

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

    const displayExpense = useMemo(function() {
        if (!expenses || !expenseCategories) return null;

        const categories = expenseCategories.reduce((obj, {_id, name, color, icon}) => ({...obj, [_id]: {name, color, icon}}), {});

        return Object.keys(expenses)
            .filter(expenseDate => {
                const [expenseMonth, , expenseYear] = expenseDate.split('/');
                return +expenseMonth === month + 1 && +expenseYear === year;
            })
            .sort((a, b) => +b.split('/')[1] - +a.split('/')[1])
            .map(expenseDate => {
                const [month, date,] = expenseDate.split('/');
                return {
                    date: `${phoneBreakpoint ? months[+month - 1] : months[+month - 1].slice(0, 3)} ${date}`,
                    amount: expenses[expenseDate].reduce((total, {amount}) => total + amount, 0),
                    expenses: expenses[expenseDate].map(expense => ({...expense, category: categories[expense.category_id]}))
                };
            });
    }, [month, year, expenses, expenseCategories, phoneBreakpoint]);

    const calendarExpense = useMemo(function() {
        if (!expenseDate || !expenses || !expenses[expenseDate]) return null;

        const [month, date, year] = expenseDate.split('/');
        const categories = expenseCategories.reduce((obj, {_id, name, color, icon}) => ({...obj, [_id]: {name, color, icon}}), {});

        return {
            date: `${year} ${months[+month - 1]} ${date}`,
            amount: expenses[expenseDate].reduce((total, {amount}) => total + amount, 0),
            expenses: expenses[expenseDate].map(expense => ({...expense, category: categories[expense.category_id]}))
        };
    }, [expenses, expenseDate, expenseCategories]);

    async function addHandler() {
        if (!proccessingNewExpense) {
            setProccessingNewExpense(true);
            setNewExpenseError({});
            await contr.createExpense(newExpenseName, +newExpenseAmount, newExpenseDate, newExpenseCategory?._id, csrfToken, accessToken, setNewExpenseError, resetAddExpenseModal);
            setProccessingNewExpense(false);
        }
    }

    async function deleteHandler() {
        if (!processing.includes(expense?._id)) {
            dispatch(addProcess(expense._id));
            await contr.deleteExpense(expense._id, csrfToken, accessToken, setShowExpense);
            dispatch(deleteProcess(expense._id));
        }
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
            <ExpenseHead />
            <section className="w-5/6 mx-auto py-8 pb-16 flex flex-col desktop:flex-row justify-center gap-6 desktop:gap-24">
                {
                    desktopBreakpoint
                    ? <section className="flex flex-col gap-8 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <Menu>
                                    <MenuButton className="flex items-center gap-2 cursor-pointer">{year} <TiArrowSortedDown /></MenuButton>
                                    <MenuItems transition anchor="bottom center" className={`w-28 ${new Date().getFullYear() - +process.env.START_YEAR + 1 > 7 && `h-72 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`} mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                        {
                                            Array.from({length: new Date().getFullYear() - +process.env.START_YEAR + 1}, (_, i) => new Date().getFullYear() - i).map(year => (
                                                <MenuItem key={year}>
                                                    <button onClick={() => dispatch(setYear(year))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{year}</button>
                                                </MenuItem>
                                            ))
                                        }
                                    </MenuItems>
                                </Menu>
                                <Menu>
                                    <MenuButton className="flex items-center gap-2 cursor-pointer">{months[month].slice(0, 3)} <TiArrowSortedDown /></MenuButton>
                                    <MenuItems transition anchor="bottom center" className={`w-28 h-72 mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)} origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                        {
                                            months.map((month, i) => (
                                                <MenuItem key={month}>
                                                    <button onClick={() => dispatch(setMonth(i))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{month.slice(0, 3)}</button>
                                                </MenuItem>
                                            ))
                                        }
                                    </MenuItems>
                                </Menu>
                            </div>
                            <div className="flex items-center gap-8">
                                <span onClick={() => dispatch(prevMonth())} className={`p-1 text-2xl ${year === +process.env.START_YEAR && month === 0 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowLeftSLine /></span>
                                <span onClick={() => dispatch(nextMonth())} className={`p-1 text-2xl ${year === new Date().getFullYear() && month === 11 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowRightSLine /></span>
                            </div>
                        </div>
                        <ExpenseCalendar />
                        {calendarExpense && <ExpenseSection expense={calendarExpense} setModal={setShowExpense} />}
                    </section>
                    : <div className="w-full max-w-96 tablet:w-3/5 tablet:max-w-none mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Menu>
                                <MenuButton className="flex items-center gap-2 cursor-pointer">{year} <TiArrowSortedDown /></MenuButton>
                                <MenuItems transition anchor="bottom center" className={`w-28 ${new Date().getFullYear() - +process.env.START_YEAR + 1 > 7 && `h-72 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`} mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                    {
                                        Array.from({length: new Date().getFullYear() - +process.env.START_YEAR + 1}, (_, i) => new Date().getFullYear() - i).map(year => (
                                            <MenuItem key={year}>
                                                <button onClick={() => dispatch(setYear(year))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{year}</button>
                                            </MenuItem>
                                        ))
                                    }
                                </MenuItems>
                            </Menu>
                            <Menu>
                                <MenuButton className="flex items-center gap-2 cursor-pointer">{months[month].slice(0, 3)} <TiArrowSortedDown /></MenuButton>
                                <MenuItems transition anchor="bottom center" className={`w-28 h-72 mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)} origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                    {
                                        months.map((month, i) => (
                                            <MenuItem key={month}>
                                                <button onClick={() => dispatch(setMonth(i))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{month.slice(0, 3)}</button>
                                            </MenuItem>
                                        ))
                                    }
                                </MenuItems>
                            </Menu>
                        </div>
                        <FaRegCalendarAlt className="text-xl cursor-pointer" />
                    </div>
                }
                <section className="w-full max-w-96 tablet:w-3/5 tablet:max-w-none desktop:w-1/3 desktop:min-w-96 desktop:max-w-none mx-auto desktop:mx-0 flex flex-col gap-8">
                    <header className="flex flex-col-reverse phone:flex-row phone:items-center phone:justify-between gap-4">
                        <div className="flex items-center gap-2 phone:flex-col phone:items-start phone:gap-0 overflow-hidden">
                            <span className={`text-xs ${getTextNeutralColor(theme)}`}>Expenses:</span>
                            <span className="text-xl truncate">
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
                    <main className="flex flex-col gap-8">
                        {
                            displayExpense
                            ? displayExpense.map(expense => <ExpenseSection key={expense.date} expense={expense} setModal={setShowExpense} />)
                            : Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="w-full h-14 gap-4" />)
                        }
                    </main>
                </section>
            </section>
            <AddExpenseModal modal={addExpense} setModal={setAddExpense} name={newExpenseName} setName={setNewExpenseName} amount={newExpenseAmount} setAmount={setNewExpenseAmount} date={newExpenseDate} setDate={setNewExpenseDate} category={newExpenseCategory} setCategory={setNewExpenseCategory} error={newExpenseError} processing={proccessingNewExpense} submit={addHandler} />
            <ExpenseModal modal={showExpense} setModal={setShowExpense} deleteHandler={deleteHandler} />
        </HelmetProvider>
    );
}