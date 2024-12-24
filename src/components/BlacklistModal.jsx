import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import contr from '../controllers/user';

import {
    getBackgroundColor, getBgPrimaryColor, getBgErrorColor,
    getHoverBgHighlightColor,
    getDisabledBgNeutralColor,
    getTextColor, getTextPrimaryColor, getTextErrorColor, getOppositeTextColor,
    getHoverTextHighlightColor
} from '../css/color';
import css from '../css/user';

import {Modal, Box} from '@mui/material';
import Tooltip from './Tooltip';
import ButtonSpinner from './ButtonSpinner';
import {MdErrorOutline} from 'react-icons/md';

export default function EditNameModal(props) {
    const {blacklistModal, setBlacklistModal, blacklistReason, setBlacklistReason, blacklistError, blacklistUser} = props;

    const theme = useSelector((state) => state.web.theme);
    const user = useSelector((state) => state.userPage.user);
    const processing = useSelector((state) => state.userPage.processing);

    const [labelClass, setLabelClass] = useState(css(theme).labelMiddle);
    const [inputClass, setInputClass] = useState(css(theme).defaultInput);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        contr.inputErrorHandler(theme, blacklistError.reason, blacklistReason, setLabelClass, setInputClass);
    }, [blacklistError, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    function reasonInputFocus() {
        if (blacklistError.reason) setLabelClass(css(theme).labelTopError)
        else setLabelClass(css(theme).labelTopFocus);
    }

    function reasonInputBlur() {
        if (blacklistError.reason) setLabelClass(blacklistReason ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setLabelClass(blacklistReason ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function enterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            blacklistUser();
        }
    }

    return (
        <Modal open={blacklistModal} onClose={() => setBlacklistModal(false)} aria-labelledby="Blacklist Modal" aria-describedby="Blacklist user">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Blacklist User</h2>
                    <small className="text-sm">Please provide a reason for blacklisting this user. This action is critical and should be justified.</small>
                </header>
                <main>
                    <form onKeyDown={enterKeyDown} className="relative" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        {
                            blacklistError.reason
                            &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                    <Tooltip title={blacklistError.reason} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                        <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                    </Tooltip>
                                </div>
                        }
                        <label htmlFor="reason" className={labelClass}>Reason</label>
                        <input type="text" id="reason" value={blacklistReason} disabled={processing.includes(user?._id)} autoFocus onChange={(e) => setBlacklistReason(e.target.value)} onFocus={reasonInputFocus} onBlur={reasonInputBlur} className={inputClass} />
                    </form>
                </main>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setBlacklistModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                    <button onClick={blacklistUser} disabled={processing.includes(user?._id)} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {processing.includes(user?._id) && <ButtonSpinner />}
                        <span className={processing.includes(user?._id) ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

EditNameModal.propTypes = {
    blacklistModal: PropTypes.bool,
    setBlacklistModal: PropTypes.func,
    blacklistReason: PropTypes.string,
    setBlacklistReason: PropTypes.func,
    blacklistError: PropTypes.object,
    blacklistUser: PropTypes.func
};