import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
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
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {MdErrorOutline} from 'react-icons/md';

export default function ChangePwdModal(props) {
    const {changePwdModal, setChangePwdModal, pwd, setPwd, confPwd, setConfPwd, pwdError, changePwd} = props;

    const theme = useSelector((state) => state.web.theme);
    const user = useSelector((state) => state.userPage.user);
    const processing = useSelector((state) => state.userPage.processing);

    const [pwdLabelClass, setPwdLabelClass] = useState(css(theme).labelMiddle);
    const [pwdInputClass, setPwdInputClass] = useState(css(theme).defaultInput);
    const [showPwd, setShowPwd] = useState(false);
    const [confPwdLabelClass, setConfPwdLabelClass] = useState(css(theme).labelMiddle);
    const [confPwdInputClass, setConfPwdInputClass] = useState(css(theme).defaultInput);
    const [showConfPwd, setShowConfPwd] = useState(false);

    const pwdInputRef = useRef(null);
    const confPwdInputRef = useRef(null);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    useEffect(function() {
        contr.inputErrorHandler(theme, pwdError.pwd, pwd, setPwdLabelClass, setPwdInputClass, true);
        contr.inputErrorHandler(theme, pwdError.confPwd, confPwd, setConfPwdLabelClass, setConfPwdInputClass, true);
    }, [pwdError, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        pwdInputRef.current && pwdInputRef.current.focus();
    }, [showPwd]);

    useEffect(function() {
        confPwdInputRef.current && confPwdInputRef.current.focus();
    }, [showConfPwd]);

    useEffect(function() {
        setShowPwd(false);
        setShowConfPwd(false);
    }, [changePwdModal]);

    function pwdInputFocus() {
        if (pwdError.pwd) setPwdLabelClass(css(theme).labelTopError)
        else setPwdLabelClass(css(theme).labelTopFocus);
    }

    function pwdInputBlur() {
        if (pwdError.pwd) setPwdLabelClass(pwd ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setPwdLabelClass(pwd ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function confPwdInputFocus() {
        if (pwdError.confPwd) setConfPwdLabelClass(css(theme).labelTopError)
        else setConfPwdLabelClass(css(theme).labelTopFocus);
    }

    function confPwdInputBlur() {
        if (pwdError.confPwd) setConfPwdLabelClass(confPwd ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setConfPwdLabelClass(confPwd ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function enterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            changePwd();
        }
    }

    return (
        <Modal open={changePwdModal} onClose={() => setChangePwdModal(false)} aria-labelledby="Change Password Modal" aria-describedby="Change user password">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Change Password</h2>
                    <small className="text-sm">Enter a new password and confirm it to update user login credentials.</small>
                </header>
                <main>
                    <form onKeyDown={enterKeyDown} className="flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        <div className="relative">
                            {
                                pwdError.pwd
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={pwdError.pwd} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                            <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="pwd" className={pwdLabelClass}>{phoneBreakpoint ? 'New Password' : 'Password'}</label>
                            <input type={showPwd ? "text" : "password"} id="pwd" value={pwd} ref={pwdInputRef} disabled={processing.includes(user?._id)} autoFocus onChange={(e) => setPwd(e.target.value)} onFocus={pwdInputFocus} onBlur={pwdInputBlur} className={pwdInputClass} />
                            <div onClick={() => setShowPwd((value) => !value)} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                {
                                    showPwd
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }
                            </div>
                        </div>
                        <div className="relative">
                            {
                                pwdError.confPwd
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={pwdError.confPwd} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                            <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="confPwd" className={confPwdLabelClass}>{!phoneBreakpoint ? 'Confirm' : tabletBreakpoint ? 'Confirm New Password' : 'Confirm Password'}</label>
                            <input type={showConfPwd ? "text" : "password"} id="confPwd" value={confPwd} ref={confPwdInputRef} disabled={processing.includes(user?._id)} autoFocus onChange={(e) => setConfPwd(e.target.value)} onFocus={confPwdInputFocus} onBlur={confPwdInputBlur} className={confPwdInputClass} />
                            <div onClick={() => setShowConfPwd((value) => !value)} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                {
                                    showConfPwd
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }
                            </div>
                        </div>
                    </form>
                </main>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setChangePwdModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                    <button onClick={changePwd} disabled={processing.includes(user?._id)} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {processing.includes(user?._id) && <ButtonSpinner />}
                        <span className={processing.includes(user?._id) ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

ChangePwdModal.propTypes = {
    changePwdModal: PropTypes.bool,
    setChangePwdModal: PropTypes.func,
    pwd: PropTypes.string,
    setPwd: PropTypes.func,
    confPwd: PropTypes.string,
    setConfPwd: PropTypes.func,
    pwdError: PropTypes.object,
    changePwd: PropTypes.func
};