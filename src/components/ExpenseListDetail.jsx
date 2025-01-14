import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';

import {getBgPrimaryColor, getHoverBgNeutral50Color, getBgHighlightColor} from '../css/color';

export default function ExpenseListDetail(props) {
    const {expense, total, setModal} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <div onClick={() => setModal(expense)} className={`py-2 flex items-center gap-4 ${getHoverBgNeutral50Color(theme)} rounded-md cursor-pointer`}>
            <div className="w-fit p-2 rounded-full shrink-0" style={{backgroundColor: `#${expense.category.color}`}}>
                <img src={`${process.env.EXPENSE_CATEGORY_URI}/${expense.category.icon}`} alt={expense.category.name} className="w-6 h-6 shrink-0" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex-1 flex items-center justify-between gap-2 phone:gap-4">
                    <div className="flex-1 min-w-0 flex items-center gap-4">
                        <span className="truncate overflow-hidden whitespace-nowrap">{expense.expense}</span>
                        <span className="hidden tablet:inline text-xs">{((expense.amount / total) * 100).toFixed(2)}%</span>
                    </div>
                    <span className="hidden phone:inline w-16 tablet:w-20 text-end truncate">{expense.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
                <div className={`h-2 ${theme === 'dark' ? getBgHighlightColor(theme) : getBgPrimaryColor(theme)} rounded-md`} style={{width: `${((expense.amount / total) * 100).toFixed(2)}%`}}></div>
                <span className="text-xs">{format(new Date(expense.expense_date), "MMM d")}</span>
            </div>
        </div>
    );
}

ExpenseListDetail.propTypes = {
    expense: PropTypes.object,
    total: PropTypes.number,
    setModal: PropTypes.func
};