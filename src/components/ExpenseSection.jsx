import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';
import themes from '../../config/theme';

import {setExpense} from '../redux/expensePageSlice';

import {getTextNeutralColor, getTextErrorColor, getHoverBgNeutral50Color} from '../css/color';

import {FaExclamation} from 'react-icons/fa6';

export default function ExpenseSection(props) {
    const {expense, setModal} = props;
    const {date, amount, expenses} = expense;

    const theme = useSelector((state) => state.web.theme);
    const dispatch = useDispatch();

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    function clickHandler(expense) {
        dispatch(setExpense(expense));
        setModal(true);
    }

    return (
        <div key={date} className="w-full flex flex-col gap-2">
            <div className={`flex items-center justify-between gap-8 text-sm ${getTextNeutralColor(theme)}`}>
                <span className="whitespace-nowrap">{date}</span>
                <span className="truncate">Expenses: {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            </div>
            <div className="flex flex-col">
                {
                    expenses.map(expense => (
                        <span key={expense._id} onClick={() => clickHandler(expense)} className={`py-2 grid grid-cols-[auto,1fr] phone:grid-cols-[auto,1fr,auto] items-center gap-4 cursor-pointer ${getHoverBgNeutral50Color(theme)} rounded-md overflow-hidden`}>
                            <div className="w-fit p-2 rounded-full" style={{backgroundColor: expense.category ? `#${expense.category.color}` : themes[theme].neutral}}>
                                {
                                    expense.category
                                    ? <img src={`${process.env.EXPENSE_CATEGORY_URI}/${expense.category.icon}`} alt={expense.category.name} className="w-6 h-6 shrink-0" />
                                    : <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                                        <FaExclamation className={`text-xl ${getTextErrorColor(theme)}`} />
                                    </div>
                                }
                            </div>
                            <span className="w-full truncate">{expense.expense}</span>
                            {phoneBreakpoint && <span className="max-w-24 truncate">{expense.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>}
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