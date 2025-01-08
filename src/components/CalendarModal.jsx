import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {
    getBackgroundColor,
    getTextColor, getTextPrimaryColor,
    getHoverTextHighlightColor,
    getScrollbarTrackBackground, getScrollbarThumbText
} from '../css/color';

import {Modal, Box} from '@mui/material';
import CalendarSetting from './CalendarSetting';
import ExpenseCalendar from './ExpenseCalendar';
import ExpenseSection from './ExpenseSection';

export default function CalendarModal(props) {
    const {modal, setModal, expense, setShowExpense} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Calendar Modal" aria-describedby="Expense calendar">
            <Box className={`w-max h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <section className={`max-h-[530px] flex flex-col gap-8 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                    <header className="text-xl">Expense Calendar</header>
                    <main className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <CalendarSetting arrow={true} smallGap={true} />
                        </div>
                        <ExpenseCalendar small />
                        <div className="mx-auto w-[272px] tablet:w-[328px]">
                            {expense && <ExpenseSection expense={expense} setModal={setShowExpense} />}
                        </div>
                    </main>
                </section>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                </footer>
            </Box>
        </Modal>
    );
}

CalendarModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    expense: PropTypes.object,
    setShowExpense: PropTypes.func
};