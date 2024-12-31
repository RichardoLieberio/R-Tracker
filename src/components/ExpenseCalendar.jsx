import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import days from '../../config/days';

import {
    getBgNeutral10Color, getBgHighlight20Color,
    getBorderText20Color,
    getHoverBorderHighlightColor,
    getTextNeutralColor
} from '../css/color';

export default function ExpenseCalendar() {
    const theme = useSelector((state) => state.web.theme);
    const expenses = useSelector((state) => state.data.expenses);
    const year = useSelector((state) => state.expensePage.year);
    const month = useSelector((state) => state.expensePage.month);

    const calendar = useMemo(function() {
        const firstDay = new Date(year, month, 1).getDay();
        const monthLastDate = new Date(year, month + 1, 0).getDate();
        const lastMonthLastDate = new Date(year, month, 0).getDate();

        let calendar = Array.from({length: firstDay === 0 ? 7 : firstDay}, (_, i) => {
            const date = lastMonthLastDate - (firstDay === 0 ? 7 : firstDay) + 1 + i;
            const expense = expenses[new Date(year, month - 1, date).toLocaleDateString()]?.reduce((val, {amount}) => val + amount, 0);
            return {date, expense, included: false};
        });

        calendar = [...calendar, ...Array.from({length: monthLastDate}, (_, i) => {
            const date = i + 1;
            const expense = expenses[new Date(year, month, date).toLocaleDateString()]?.reduce((val, {amount}) => val + amount, 0);
            return {date, expense, included: true};
        })];

        if (calendar.length !== 42) calendar = [...calendar, ...Array.from({length: 42 % calendar.length}, (_, i) => {
            const date = i + 1;
            const expense = expenses[new Date(year, month + 1, date).toLocaleDateString()]?.reduce((val, {amount}) => val + amount, 0);
            return {date, expense, included: false};
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
                    calendar.map(({date, expense, included}, i) => (
                        <div key={i} className={`w-16 h-14 p-1 flex flex-col justify-between text-center ${expense && getBgHighlight20Color(theme)} border ${included ? getBorderText20Color(theme) : `border-transparent ${getBgNeutral10Color(theme)}`} rounded-md cursor-pointer ${getHoverBorderHighlightColor(theme)}`}>
                            <span className="text-sm">{date}</span>
                            {expense && <small className={`text-xs ${getTextNeutralColor(theme)} truncate`}>{expense}</small>}
                        </div>
                    ))
                }
            </main>
        </div>
    );
}