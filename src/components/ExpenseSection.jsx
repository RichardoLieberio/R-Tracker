import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {setExpense} from '../redux/expensePageSlice';

import {getHoverBgNeutral50Color} from '../css/color';

export default function ExpenseSection(props) {
    const {expense, setModal} = props;
    const {month, date, amount, expenses} = expense;

    const theme = useSelector((state) => state.web.theme);
    const dispatch = useDispatch();

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    function clickHandler(expense) {
        dispatch(setExpense(expense));
        setModal(true);
    }

    return (
        <div key={date} className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between gap-8 text-sm">
                <span className="whitespace-nowrap">{phoneBreakpoint ? month : month.slice(0, 3)} {date}</span>
                <span className="truncate">Expenses: {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            </div>
            <div className="flex flex-col">
                {
                    expenses.map(expense => (
                        <span key={expense._id} onClick={() => clickHandler(expense)} className={`py-2 flex items-center justify-between gap-4 cursor-pointer ${getHoverBgNeutral50Color(theme)} rounded-md overflow-hidden`}>
                            <span className="flex items-center gap-4">
                                <div className="p-2 mx-auto rounded-full shrink-0" style={{backgroundColor: `#${expense.category.color}`}}>
                                    <img src={`${process.env.EXPENSE_CATEGORY_URI}/${expense.category.icon}`} alt={expense.category.name} className="w-6 h-6 shrink-0" />
                                </div>
                                <span className="truncate">{expense.expense}</span>
                            </span>
                            {phoneBreakpoint && <span>{expense.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>}
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

ExpenseSection.propTypes = {
    expense: PropTypes.object,
    setModal: PropTypes.func
};