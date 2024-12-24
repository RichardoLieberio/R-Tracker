import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {
    getBgPrimaryColor, getBackgroundColor,
    getHoverBgHighlightColor,
    getDisabledBgNeutralColor,
    getTextColor, getTextPrimaryColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getHoverBorderHighlightColor
} from '../css/color';

import {Modal, Box} from '@mui/material';
import ButtonSpinner from './ButtonSpinner';

export default function ConfirmDeleteAccount(props) {
    const {whitelistModal, setWhitelistModal, whitelistUser} = props;

    const theme = useSelector((state) => state.web.theme);
    const user = useSelector((state) => state.userPage.user);
    const processing = useSelector((state) => state.userPage.processing);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    return (
        <Modal open={whitelistModal} onClose={() => setWhitelistModal(false)} aria-labelledby="Whitelist Modal" aria-describedby="Whitelist user account">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Whitelist User</h2>
                    <small className="text-sm">Are you sure you want to whitelist this user? This action will grant them access again.</small>
                </header>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setWhitelistModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>Close</button>
                    <button onClick={whitelistUser} disabled={processing.includes(user?._id)} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {processing.includes(user?._id) && <ButtonSpinner />}
                        <span className={processing.includes(user?._id) ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

ConfirmDeleteAccount.propTypes = {
    whitelistModal: PropTypes.bool,
    setWhitelistModal: PropTypes.func,
    whitelistUser: PropTypes.func
};