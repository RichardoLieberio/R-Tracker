import PropTypes from 'prop-types';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';
import months from '../../config/months';

import {
    getBackgroundColor,
    getTextPrimaryColor, getTextColor,
    getHoverTextHighlightColor,
    getScrollbarTrackBackground,
    getScrollbarThumbText
} from '../css/color';

import {Modal, Box} from '@mui/material';
import ExpenseLineChart from './ExpenseLineChart';

export default function ChartModal(props) {
    const {modal, setModal, expense} = props;

    const theme = useSelector((state) => state.web.theme);
    const month = useSelector((state) => state.chartPage.month);
    const year = useSelector((state) => state.chartPage.year);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    const data = useMemo(function() {
        if (!expense?.expenses) return {dates: [], expenses: []};

        const lastDate = new Date(year, month + 1, 0).getDate();
        const dates = Array.from({length: lastDate}, (_, i) => i + 1);
        const expenses = Array.from({length: lastDate}, () => 0);

        expense.expenses.map(({amount, expense_date}) => expenses[new Date(expense_date).getDate()] = expenses[new Date(expense_date).getDate()] + amount);

        return {dates, expenses};
    }, [expense, month, year]);

    const chartSize = tabletBreakpoint ? 384 : phoneBreakpoint ? 277 : 213;

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Chart Modal" aria-describedby="Expense chart by category">
            <Box className={`w-5/6 min-w-56 phone:w-2/3 phone:min-w-72 phone:max-w-[430px] tablet:w-[430px] h-auto py-7 phone:py-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <main className={`max-h-96 px-7 phone:px-8 flex flex-col gap-8 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                    <section className="flex flex-col gap-8">
                        <header className="flex items-center justify-between text-xl font-semibold">{expense.name}</header>
                        <main className="flex flex-col">
                            <span>Total: {expense?.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                            <div className="relative" style={{height: chartSize / 5 * 4}}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                    <ExpenseLineChart size={chartSize} {...data} month={months[month]} />
                                </div>
                            </div>
                        </main>
                    </section>
                </main>
                <footer className="px-7 phone:px-8 flex items-center justify-end gap-4">
                    <button onClick={() => setModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                </footer>
            </Box>
        </Modal>
    );
}

ChartModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    expense: PropTypes.object
};