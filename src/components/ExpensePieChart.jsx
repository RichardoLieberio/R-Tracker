import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {PieChart} from '@mui/x-charts/PieChart';
import Skeleton from './Skeleton';

export default function ExpensePieChart() {
    const expenses = useSelector((state) => state.data.expenses);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const month = useSelector((state) => state.chartPage.month);
    const year = useSelector((state) => state.chartPage.year);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    const data = useMemo(function() {
        if (!expenses || !expenseCategories) return;

        const categories = expenseCategories.reduce((obj, {_id, name, color, icon}) => ({...obj, [_id]: {name, color, icon}}), {});
        const data = Object.values(expenses).reduce((obj, expenses) => {
            expenses.map(expense => {
                const expenseDate = new Date(expense.expense_date);
                if (expenseDate.getMonth() !== month || expenseDate.getFullYear() !== year) return;

                if (!obj[expense.category_id]) obj[expense.category_id] = {...categories[expense.category_id], expenses: [], amount: 0};
                obj[expense.category_id].expenses.push(expense);
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

    const size = desktopBreakpoint ? 224 : phoneBreakpoint ? 192 : 160;

    return (
        <section className="flex flex-col tablet:flex-row items-center justify-center gap-8 tablet:gap-20">
            {
                data
                ? <div className="w-fit relative">
                    <PieChart series={[{data: data.chart, innerRadius: size / 3, outerRadius: size / 2, cx: desktopBreakpoint ? 108 : phoneBreakpoint ? 92 : 76}]} width={size + 2} height={size + 2} slotProps={{legend: {hidden: true}}} />
                    <span className="max-w-24 phone:max-w-28 desktop:max-w-36 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 truncate">{data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
                : <Skeleton className="w-40 min-w-40 max-w-40 h-40 min-h-40 max-h-40 phone:w-48 phone:min-w-48 phone:max-w-48 phone:h-48 phone:min-h-48 phone:max-h-48 desktop:w-56 desktop:min-w-56 desktop:max-w-56 desktop:h-56 desktop:min-h-56 desktop:max-h-56" />
            }
            <div className="w-full max-w-80 flex flex-col gap-4">
                {
                    data
                    ? Object.values(data.chart).map(({color, label, value}, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="w-64 flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full" style={{backgroundColor: color}}></div>
                                <span className="truncate">{label}</span>
                            </span>
                            <span>{((value / data.total) * 100).toFixed(2)}%</span>
                        </div>
                    ))
                    : <>
                        <Skeleton className="min-w-full max-w-80 h-6" />
                        <Skeleton className="min-w-full max-w-80 h-6" />
                        <Skeleton className="min-w-full max-w-80 h-6" />
                        <Skeleton className="min-w-full max-w-80 h-6" />
                    </>
                }
            </div>
        </section>
    );
}