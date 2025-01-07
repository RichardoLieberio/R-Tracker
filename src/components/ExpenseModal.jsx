import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';
import {format} from 'date-fns';

import breakpoints from '../../config/breakpoints';

import {
    getBgPrimaryColor, getBackgroundColor,
    getHoverBgHighlightColor,
    getDisabledBgNeutralColor,
    getTextColor, getTextPrimaryColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getBorderPrimaryColor, getBorderNeutralColor,
    getHoverBorderHighlightColor,
    getScrollbarTrackBackground, getScrollbarThumbText
} from '../css/color';

import {Modal, Box} from '@mui/material';
import ButtonSpinner from './ButtonSpinner';

export default function ExpenseModal(props) {
    const {modal, setModal, setEditModal, deleteHandler} = props;

    const theme = useSelector((state) => state.web.theme);
    const expense = useSelector((state) => state.expensePage.expense);
    const processing = useSelector((state) => state.expensePage.processing);

    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Expense Modal" aria-describedby="Expense detail">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto py-7 phone:py-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <main className={`max-h-96 px-7 phone:px-8 flex flex-col gap-8 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                    <section className="flex flex-col gap-8">
                        <header className="flex items-center justify-between text-xl font-semibold">Expense Detail</header>
                        <main className="flex flex-col desktop:flex-row gap-8">
                            <section className="flex desktop:flex-col items-center gap-4 overflow-hidden">
                                <div className="p-4 rounded-full shrink-0" style={{backgroundColor: `#${expense?.category.color}`}}>
                                    <img src={`${process.env.EXPENSE_CATEGORY_URI}/${expense?.category.icon}`} alt={expense?.category.name} className="w-8 h-8 desktop:w-16 desktop:h-16 shrink-0" />
                                </div>
                                <span className="desktop:w-20 text-start text-wrap break-words">{expense ? expense.category.name : '-'}</span>
                            </section>
                            <section className="desktop:flex-1 flex flex-col gap-4">
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Expense</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{expense ? expense.expense : '-'}</span>
                                </div>
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Amount</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{expense ? expense.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}</span>
                                </div>
                                <div className="flex-1 relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Expense Date</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{expense ? format(new Date(expense.expense_date), 'MMMM dd, yyyy') : '-'}</span>
                                </div>
                            </section>
                        </main>
                    </section>
                </main>
                <footer className="px-7 phone:px-8 flex items-center justify-between">
                    {desktopBreakpoint && <button onClick={() => setModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>}
                    <div className="flex-1 desktop:flex-none flex items-center gap-4">
                        <button onClick={deleteHandler} disabled={processing.includes(expense?._id)} className={`w-full desktop:w-fit py-1 desktop:px-8 relative ${theme === 'dark' ? getTextColor(theme) : `${getTextPrimaryColor(theme)} border ${getBorderPrimaryColor(theme)}`} ${getHoverTextHighlightColor(theme)} rounded-md ${getHoverBorderHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:border-none disabled:cursor-not-allowed`}>
                            {processing.includes(expense?._id) && <ButtonSpinner />}
                            <span className={processing.includes(expense?._id) ? 'opacity-0' : ''}>Delete</span>
                        </button>
                        <button onClick={() => setEditModal(true)} disabled={processing.includes(expense?._id)} className={`w-full desktop:w-fit py-1 desktop:px-8 relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                            {processing.includes(expense?._id) && <ButtonSpinner />}
                            <span className={processing.includes(expense?._id) ? 'opacity-0' : ''}>Edit</span>
                        </button>
                    </div>
                </footer>
            </Box>
        </Modal>
    );
}

ExpenseModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    setEditModal: PropTypes.func,
    deleteHandler: PropTypes.func
};