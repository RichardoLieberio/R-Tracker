import {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import days from '../../config/days';

import {setExpenseDate} from '../redux/expensePageSlice';

import {
    getBgNeutral10Color, getBgHighlight20Color,
    getBorderText20Color,
    getHoverBorderHighlightColor,
    getTextErrorColor
} from '../css/color';

import Skeleton from './Skeleton';

export default function ExpenseCalendar() {
    const theme = useSelector((state) => state.web.theme);
    const expenses = useSelector((state) => state.data.expenses);
    const year = useSelector((state) => state.expensePage.year);
    const month = useSelector((state) => state.expensePage.month);

    const dispatch = useDispatch();

    const calendar = useMemo(function() {
        const firstDay = new Date(year, month, 1).getDay();
        const monthLastDate = new Date(year, month + 1, 0).getDate();
        const lastMonthLastDate = new Date(year, month, 0).getDate();

        let calendar = Array.from({length: firstDay === 0 ? 7 : firstDay}, (_, i) => {
            const date = lastMonthLastDate - (firstDay === 0 ? 7 : firstDay) + 1 + i;
            const fullDate = new Date(year, month - 1, date).toLocaleDateString();
            const expense = expenses ? expenses[fullDate]?.reduce((val, {amount}) => val + amount, 0) : null;
            return {date, expense, included: false, fullDate};
        });

        calendar = [...calendar, ...Array.from({length: monthLastDate}, (_, i) => {
            const date = i + 1;
            const fullDate = new Date(year, month, date).toLocaleDateString();
            const expense = expenses ? expenses[fullDate]?.reduce((val, {amount}) => val + amount, 0) : null;
            return {date, expense, included: true, fullDate};
        })];

        if (calendar.length !== 42) calendar = [...calendar, ...Array.from({length: 42 % calendar.length}, (_, i) => {
            const date = i + 1;
            const fullDate = new Date(year, month + 1, date).toLocaleDateString();
            const expense = expenses ? expenses[fullDate]?.reduce((val, {amount}) => val + amount, 0) : null;
            return {date, expense, included: false, fullDate};
        })];

        return calendar;
    }, [year, month, expenses]);

    return (
        <div className="flex flex-col gap-4">
            <header className="grid grid-cols-7 grid-rows-1 gap-2">
                {
                    days.map(day => <span key={day} className="w-16 text-center">{day.slice(0, 3)}</span>)
                }
            </header>
            <main className="grid grid-cols-7 grid-rows-6 gap-2">
                {
                    calendar.map(({date, expense, included, fullDate}, i) => (
                        <div key={i} onClick={() => dispatch(setExpenseDate(fullDate))} className={`w-16 h-14 p-1 flex flex-col justify-between text-center ${expense && getBgHighlight20Color(theme)} border ${included ? getBorderText20Color(theme) : `border-transparent ${getBgNeutral10Color(theme)}`} rounded-md cursor-pointer ${getHoverBorderHighlightColor(theme)}`}>
                            <span className="text-sm">{date}</span>
                            {
                                expense === null
                                ? <Skeleton className="w-full h-3" />
                                : expense && <small className={`text-xs ${getTextErrorColor(theme)} truncate`}>{expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</small>
                            }
                        </div>
                    ))
                }
            </main>
        </div>
    );
}