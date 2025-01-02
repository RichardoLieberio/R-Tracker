import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';

import {
    getBackgroundColor,
    getTextColor,
    getBorderNeutralColor,
    getScrollbarTrackBackground,
    getScrollbarThumbText
} from '../css/color';

import {Modal, Box} from '@mui/material';

export default function ExpenseModal(props) {
    const {modal, setModal} = props;

    const theme = useSelector((state) => state.web.theme);
    const expense = useSelector((state) => state.expensePage.expense);

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Expense Modal" aria-describedby="Expense detail">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto py-7 phone:py-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <main className={`max-h-96 px-7 phone:px-8 flex flex-col gap-8 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                    <section className="flex flex-col gap-8">
                        <header className="flex items-center justify-between text-xl font-semibold">Expense Detail</header>
                        <main className="flex flex-col gap-4">
                            <div className="mb-4 flex items-center gap-4">
                                <div className="p-2 rounded-full shrink-0" style={{backgroundColor: `#${expense.category.color}`}}>
                                    <img src={`${process.env.EXPENSE_CATEGORY_URI}/${expense.category.icon}`} alt={expense.category.name} className="w-6 h-6 shrink-0" />
                                </div>
                                <div className="flex-1 relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Type</span>
                                    <span className={`px-3 py-2 border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{expense ? expense.category.name : '-'}</span>
                                </div>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Expense</span>
                                <span className={`px-3 py-2 border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{expense ? expense.expense : '-'}</span>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Amount</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{expense ? expense.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}</span>
                            </div>
                            <div className="flex-1 relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Expense Date</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{expense ? format(new Date(expense.expense_date), 'MMMM dd, yyyy') : '-'}</span>
                            </div>
                        </main>
                    </section>
                </main>
            </Box>
        </Modal>
    );
}

ExpenseModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func
};