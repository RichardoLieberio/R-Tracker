import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {getBgPrimaryColor, getBgHighlightColor, getHoverBgNeutral50Color} from '../css/color';

export default function ExpenseList(props) {
    const {openModal, name, color, icon, amount, expenses, total} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <div onClick={() => openModal(name, amount, expenses)} className={`px-2 py-3 flex items-center gap-4 ${getHoverBgNeutral50Color(theme)} rounded-md cursor-pointer`}>
            <div className="w-fit p-2 rounded-full shrink-0" style={{backgroundColor: `#${color}`}}>
                <img src={`${process.env.EXPENSE_CATEGORY_URI}/${icon}`} alt={name} className="w-6 h-6 shrink-0" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex-1 flex items-center justify-between gap-2 phone:gap-4">
                    <div className="flex items-center gap-4">
                        <span className="max-w-24 phone:max-w-32 tablet:max-w-72 desktop:max-w-80 truncate">{name}</span>
                        <span className="hidden tablet:inline text-xs">{((amount / total) * 100).toFixed(2)}%</span>
                    </div>
                    <span className="w-12 phone:w-20 tablet:w-32 text-end truncate">{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
                <div className={`h-2 ${theme === 'dark' ? getBgHighlightColor(theme) : getBgPrimaryColor(theme)} rounded-md`} style={{width: `${((amount / total) * 100).toFixed(2)}%`}}></div>
            </div>
        </div>
    );
}

ExpenseList.propTypes = {
    openModal: PropTypes.func,
    name: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    amount: PropTypes.number,
    expenses: PropTypes.array,
    total: PropTypes.number
};