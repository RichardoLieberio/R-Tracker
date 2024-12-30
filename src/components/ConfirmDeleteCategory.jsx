import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {
    getBgErrorColor, getBackgroundColor,
    getHoverBgError60Color,
    getDisabledBgNeutralColor,
    getTextColor, getTextPrimaryColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getHoverBorderHighlightColor
} from '../css/color';
import css from '../css/user';

import {Modal, Box} from '@mui/material';
import {IoWarningOutline} from 'react-icons/io5';
import ButtonSpinner from './ButtonSpinner';

export default function ConfirmDeleteCategory(props) {
    const {modal, setModal, deleteCategory, disabled} = props;

    const [confirmation, setConfirmation] = useState('');

    const theme = useSelector((state) => state.web.theme);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        setConfirmation(disabled ? process.env.CONFIRMATION_WORD : '');
    }, [modal]); // eslint-disable-line react-hooks/exhaustive-deps

    function confirmationHandler(e) {
        setConfirmation(e.target.value.toUpperCase());
    }

    function deleteCategoryHandler() {
        confirmation === process.env.CONFIRMATION_WORD && deleteCategory();
    }

    function enterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            deleteCategoryHandler();
        }
    }

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Delete Category Modal" aria-describedby="Delete expense category">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Delete Expense Category</h2>
                    <small className="text-sm">Are you sure you want to delete this expense category? This action cannot be undone. Expenses associated with this category will no longer have any category assigned.</small>
                </header>
                <main className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <strong className="flex items-center gap-1"><IoWarningOutline /> Warning</strong>
                        <ul className="list-disc list-inside">
                            <li>This action is irreversible.</li>
                            <li>Expenses associated with this category will become uncategorized.</li>
                            <li>Ensure that no critical data relies on this category before proceeding.</li>
                        </ul>
                    </div>
                    <form onKeyDown={enterKeyDown} className="flex flex-col gap-1" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        <span>To confirm this, type <b>&quot;{process.env.CONFIRMATION_WORD}&quot;</b></span>
                        <input type="text" value={confirmation} disabled={disabled} onChange={confirmationHandler} className={css(theme).defaultInput} />
                    </form>
                </main>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>Close</button>
                    <button onClick={deleteCategoryHandler} disabled={disabled || confirmation !== process.env.CONFIRMATION_WORD} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md ${getHoverBgError60Color(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {disabled && <ButtonSpinner />}
                        <span className={disabled ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

ConfirmDeleteCategory.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    deleteCategory: PropTypes.func,
    disabled: PropTypes.bool
};