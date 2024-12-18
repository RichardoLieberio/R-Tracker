import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import contr from '../controllers/editProfile';

import {
    getBackgroundColor, getBgPrimaryColor, getBgErrorColor,
    getHoverBgHighlightColor,
    getDisabledBgHighlightColor,
    getTextColor, getTextPrimaryColor, getOppositeTextColor, getTextLinkColor, getTextDisabledColor, getTextErrorColor,
    getHoverTextHighlightColor,
    getHoverBorderHighlightColor
} from '../css/color';
import css from '../css/editProfile';

import {Modal, Box} from '@mui/material';
import Tooltip from './Tooltip';
import ButtonSpinner from './ButtonSpinner';
import OtpInput from 'react-otp-input';
import {MdErrorOutline} from 'react-icons/md';

export default function EditEmailModal(props) {
    const {step, setStep, newEmail, setNewEmail, emailError, otp, setOtp, otpError, emailModal, setEmailModal, savingNewEmail, requestChangeEmail, resendOtp, changeEmail} = props;

    const theme = useSelector((state) => state.web.theme);

    const [second, setSecond] = useState(+process.env.RESEND_EMAIL_TIMEOUT);
    const [labelClass, setLabelClass] = useState(css(theme).labelMiddle);
    const [inputClass, setInputClass] = useState(css(theme).defaultInput);
    const [resendClass, setResendClass] = useState(theme  === 'dark' ? getTextDisabledColor(theme) : getTextLinkColor(theme));

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        contr.inputErrorHandler(theme, emailError.email, newEmail, setLabelClass, setInputClass);
    }, [emailError, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        second > 0
        ? setResendClass(theme  === 'dark' ? getTextDisabledColor(theme) : getTextLinkColor(theme))
        : setResendClass(`${theme === 'dark' ? getTextLinkColor(theme) : getTextPrimaryColor(theme)} cursor-pointer hover:underline`);
    }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        if (second > 0) {
            const interval = setInterval(function() {
                setSecond((second) => second - 1);
            }, 1000);

            return function() {
                clearInterval(interval);
            };
        } else {
            setResendClass(`${theme === 'dark' ? getTextLinkColor(theme) : getTextPrimaryColor(theme)} cursor-pointer hover:underline`);
        }
    }, [second]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        step === 'email' ? setOtp('') : disableOtp();
    }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        if (step !== 'email') {
            savingNewEmail
            ? setResendClass(theme  === 'dark' ? getTextDisabledColor(theme) : getTextLinkColor(theme))
            : setResendClass(`${theme === 'dark' ? getTextLinkColor(theme) : getTextPrimaryColor(theme)} cursor-pointer hover:underline`);
        }
    }, [savingNewEmail]); // eslint-disable-line react-hooks/exhaustive-deps

    function emailHandler(e) {
        setNewEmail(e.target.value);
    }

    function emailInputFocus() {
        if (emailError.email) setLabelClass(css(theme).labelTopError)
        else setLabelClass(css(theme).labelTopFocus);
    }

    function emailInputBlur() {
        if (emailError.email) setLabelClass(newEmail ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setLabelClass(newEmail ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function disableOtp() {
        setResendClass(theme  === 'dark' ? getTextDisabledColor(theme) : getTextLinkColor(theme));
        setSecond(+process.env.RESEND_EMAIL_TIMEOUT);
    }

    function otpHandler() {
        if (second === 0 && !savingNewEmail) {
            disableOtp();
            resendOtp();
        }
    }

    function enterKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            step === 'email' ? requestChangeEmail() : changeEmail();
        }
    }

    return (
        <Modal open={emailModal} onClose={() => setEmailModal(false)} aria-labelledby="Theme Modal" aria-describedby="Choose your theme">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                {
                    step === 'email'
                    ? <>
                        <header className="flex flex-col gap-1">
                            <h2 className="text-xl font-semibold">Edit Email</h2>
                            <small className="text-sm">Update your email address in the field below. We&apos;ll send you a one-time password (OTP) to verify your identity.</small>
                        </header>
                        <main>
                            <form onKeyDown={enterKeyDown} className="relative" autoCapitalize="off" autoComplete="off" spellCheck="false">
                                {
                                    emailError.email
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={emailError.email} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="email" className={labelClass}>New Email</label>
                                <input type="email" id="email" value={newEmail} disabled={savingNewEmail} autoFocus onChange={emailHandler} onFocus={emailInputFocus} onBlur={emailInputBlur} className={inputClass} />
                            </form>
                        </main>
                        <footer className="flex items-center justify-end gap-4">
                            <button onClick={() => setEmailModal(false)} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>Close</button>
                            <button onClick={requestChangeEmail} disabled={savingNewEmail} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgHighlightColor(theme)} disabled:cursor-not-allowed`}>
                                {savingNewEmail && <ButtonSpinner />}
                                <span className={savingNewEmail ? 'opacity-0' : ''}>Send</span>
                            </button>
                        </footer>
                    </>
                    : <>
                        <header className="flex flex-col gap-1">
                            <h2 className="text-xl font-semibold">Verify Your Email</h2>
                            <small className="text-sm">Check your email {newEmail} for the OTP and enter it below to continue.</small>
                        </header>
                        <main>
                            <form onKeyDown={enterKeyDown} className="w-full phone:w-[212px] desktop:w-[280px] mx-auto relative flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                                <div className="flex flex-col gap-2">
                                    {
                                        otpError
                                        &&  <span className={`flex items-center gap-1 ${getTextErrorColor(theme)}`}>
                                                <MdErrorOutline className="text-lg" /> {otpError}
                                            </span>
                                    }
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        inputType="tel"
                                        placeholder={'-' * +process.env.OTP_LENGTH}
                                        numInputs={+process.env.OTP_LENGTH}
                                        shouldAutoFocus={true}
                                        renderInput={(props) => <input {...props} disabled={savingNewEmail} />}
                                        containerStyle="phone:gap-1 desktop:gap-2"
                                        inputStyle={savingNewEmail ? css(theme).disabledOtp : otpError ? css(theme).errorOtp : css(theme).otp}
                                    />
                                </div>
                                <span className="text-sm">
                                    Didn&apos;t receive your OTP? <span onClick={otpHandler} className={resendClass}>Resend{second ? ` (${second})` : ''}</span>
                                </span>
                            </form>
                        </main>
                        <footer className="flex items-center justify-end gap-4">
                            <button onClick={() => setStep('email')} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>Back</button>
                            <button onClick={changeEmail} disabled={savingNewEmail} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgHighlightColor(theme)} disabled:cursor-not-allowed`}>
                                {savingNewEmail && <ButtonSpinner />}
                                <span className={savingNewEmail ? 'opacity-0' : ''}>Save</span>
                            </button>
                        </footer>
                    </>
                }
            </Box>
        </Modal>
    );
}

EditEmailModal.propTypes = {
    step: PropTypes.string,
    setStep: PropTypes.func,
    newEmail: PropTypes.string,
    setNewEmail: PropTypes.func,
    emailError: PropTypes.object,
    otp: PropTypes.string,
    setOtp: PropTypes.func,
    otpError: PropTypes.string,
    emailModal: PropTypes.bool,
    setEmailModal: PropTypes.func,
    savingNewEmail: PropTypes.bool,
    requestChangeEmail: PropTypes.func,
    resendOtp: PropTypes.func,
    changeEmail: PropTypes.func
};