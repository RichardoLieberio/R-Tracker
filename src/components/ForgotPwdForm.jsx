import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import contr from '../controllers/forgotPwdForm';

import css from '../css/forgotPwdForm';

import {IoArrowBack} from 'react-icons/io5';
import Tooltip from './Tooltip';
import ButtonSpinner from './ButtonSpinner';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {MdErrorOutline} from 'react-icons/md';

export default function ForgotPwdForm(props) {
    const {email, setStep} = props;
    const [pwd, setPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [otp, setOtp] = useState('');
    const [csrfToken, setCSRFToken] = useState('');
    const [second, setSecond] = useState(+process.env.RESEND_EMAIL_TIMEOUT);
    const [showPwd, setShowPwd] = useState(false);
    const [showConfPwd, setShowConfPwd] = useState(false);
    const [formError, setFormError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pwdLabelRef = useRef(null);
    const pwdInputRef = useRef(null);
    const confPwdLabelRef = useRef(null);
    const confPwdInputRef = useRef(null);
    const otpLabelRef = useRef(null);
    const otpInputRef = useRef(null);
    const hasToggled = useRef(false);
    const resendRef = useRef(null);

    const navigate = useNavigate();

    const accessToken = useSelector((state) => state.auth.accessToken);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        getToast();
        getCSRFToken(setCSRFToken);
    }, []);

    useEffect(function() {
        contr.inputEffect(pwdLabelRef, pwdInputRef, pwd, formError.pwd, true);
    }, [pwd, formError.pwd]);

    useEffect(function() {
        contr.inputEffect(confPwdLabelRef, confPwdInputRef, confPwd, formError.confPwd, true);
    }, [confPwd, formError.confPwd]);

    useEffect(function() {
        contr.inputEffect(otpLabelRef, otpInputRef, otp, formError.otp);
    }, [otp, formError.otp]);

    useEffect(function() {
        hasToggled.current && pwdInputRef.current && pwdInputRef.current.focus();
    }, [showPwd]);

    useEffect(function() {
        hasToggled.current && confPwdInputRef.current && confPwdInputRef.current.focus();
    }, [showConfPwd]);

    useEffect(function() {
        if (second > 0) {
            const interval = setInterval(function() {
                resendRef.current.className = 'text-purple-link';
                setSecond((second) => second - 1);
            }, 1000);

            return function() {
                clearInterval(interval);
            };
        } else {
            if (!isSubmitting) resendRef.current.className = 'text-purple-primary cursor-pointer hover:underline';
        }
    }, [second, isSubmitting]);

    useEffect(function() {
        if (isSubmitting) resendRef.current.className = 'text-purple-link';
        if (!isSubmitting && second === 0) resendRef.current.className = 'text-purple-primary cursor-pointer hover:underline';
    }, [isSubmitting]); // eslint-disable-line react-hooks/exhaustive-deps

    function pwdHandler(e) {
        setPwd(e.target.value);
    }

    function pwdInputFocus() {
        if (formError.pwd) pwdLabelRef.current.className = css.labelTopError
        else pwdLabelRef.current.className = css.labelTopFocus;
    }

    function pwdInputBlur() {
        if (formError.pwd) pwdLabelRef.current.className = pwd ? css.labelTopError : css.labelMiddleError
        else pwdLabelRef.current.className = pwd ? css.labelTopBlur : css.labelMiddle;
    }

    function confPwdHandler(e) {
        setConfPwd(e.target.value);
    }

    function confPwdInputFocus() {
        if (formError.confPwd) confPwdLabelRef.current.className = css.labelTopError
        else confPwdLabelRef.current.className = css.labelTopFocus;
    }

    function confPwdInputBlur() {
        if (formError.confPwd) confPwdLabelRef.current.className = confPwd ? css.labelTopError : css.labelMiddleError
        else confPwdLabelRef.current.className = confPwd ? css.labelTopBlur : css.labelMiddle;
    }

    function otpHandler(e) {
        setOtp(e.target.value);
    }

    function otpInputFocus() {
        if (formError.otp) otpLabelRef.current.className = css.labelTopError
        else otpLabelRef.current.className = css.labelTopFocus;
    }

    function otpInputBlur() {
        if (formError.otp) otpLabelRef.current.className = otp ? css.labelTopError : css.labelMiddleError
        else otpLabelRef.current.className = otp ? css.labelTopBlur : css.labelMiddle;
    }

    function togglePwd() {
        setShowPwd(value => !value);
        hasToggled.current = true;
    }

    function toggleConfPwd() {
        setShowConfPwd(value => !value);
        hasToggled.current = true;
    }

    function back() {
        setStep('email');
    }

    function resendOtp() {
        if (second === 0 && !isSubmitting) {
            resendRef.current.className = 'text-purple-link';
            resendRef.current.textContent = `Resend (${process.env.RESEND_EMAIL_TIMEOUT})`;
            setSecond(+process.env.RESEND_EMAIL_TIMEOUT);

            contr.resendOtp(email, csrfToken, accessToken, setFormError);
        }
    }

    async function resetPwd(e) {
        e.preventDefault();

        if (!isSubmitting) {
            pwdInputBlur();
            confPwdInputBlur();
            otpInputBlur();

            setIsSubmitting(true);
            setFormError({});
            await contr.resetPwd(email, otp, pwd, confPwd, csrfToken, accessToken, setFormError, navigate);
            setIsSubmitting(false);
        }
    }

    return (
        <section className="w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-full mx-auto py-8 flex flex-col gap-12">
            <section onClick={back} className="w-fit cursor-pointer">
                <IoArrowBack className="text-2xl text-purple-text" />
            </section>
            <section className="flex flex-col gap-8">
                <img src="/Password.png" alt="Password" loading="lazy" className="w-20 phone:w-28 tablet:w-36 desktop:w-44 mx-auto" />
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl text-purple-text font-semibold">Reset your password</h1>
                    <p className="text-purple-text">Enter the OTP sent to your email and your new password to reset your account.</p>
                </div>
                <form className="w-fit phone:w-56 tablet:w-64 desktop:w-72 mx-auto flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                    <div className="w-full relative">
                        {
                            formError.pwd
                            &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                    <Tooltip title={formError.pwd} placement="top-start" posY={-8} className="w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm text-purple-oppositeText bg-purple-error rounded-md">
                                        <MdErrorOutline className="text-lg text-purple-error" />
                                    </Tooltip>
                                </div>
                        }
                        <label htmlFor="pwd" ref={pwdLabelRef}>New Password</label>
                        <input type={showPwd ? "text" : "password"} id="pwd" value={pwd} ref={pwdInputRef} disabled={isSubmitting} onChange={pwdHandler} onFocus={pwdInputFocus} onBlur={pwdInputBlur} className={css.pwdInput} />
                        <div onClick={togglePwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                            {
                                showPwd
                                ? <FaEyeSlash className="text-purple-text" />
                                : <FaEye className="text-purple-text" />
                            }
                        </div>
                    </div>
                    <div className="w-full relative">
                        {
                            formError.confPwd
                            &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                    <Tooltip title={formError.confPwd} placement="top-start" posY={-8} className="w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm text-purple-oppositeText bg-purple-error rounded-md">
                                        <MdErrorOutline className="text-lg text-purple-error" />
                                    </Tooltip>
                                </div>
                        }
                        <label htmlFor="confPwd" ref={confPwdLabelRef}>{phoneBreakpoint ? 'Confirm New Password' : 'Confirm Password'}</label>
                        <input type={showConfPwd ? "text" : "password"} id="confPwd" value={confPwd} ref={confPwdInputRef} disabled={isSubmitting} onChange={confPwdHandler} onFocus={confPwdInputFocus} onBlur={confPwdInputBlur} className={css.pwdInput} />
                        <div onClick={toggleConfPwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                            {
                                showConfPwd
                                ? <FaEyeSlash className="text-purple-text" />
                                : <FaEye className="text-purple-text" />
                            }
                        </div>
                    </div>
                    <div className="w-full relative">
                        {
                            formError.otp
                            &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                    <Tooltip title={formError.otp} placement="top-start" posY={-8} className="w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm text-purple-oppositeText bg-purple-error rounded-md">
                                        <MdErrorOutline className="text-lg text-purple-error" />
                                    </Tooltip>
                                </div>
                        }
                        <label htmlFor="otp" ref={otpLabelRef}>One Time Password (OTP)</label>
                        <input type="otp" id="otp" value={otp} ref={otpInputRef} disabled={isSubmitting} onChange={otpHandler} onFocus={otpInputFocus} onBlur={otpInputBlur} className={css.defaultInput} />
                    </div>
                    <span className="text-sm text-purple-text">
                        Didn&apos;t receive your OTP? <span onClick={resendOtp} ref={resendRef} className="text-purple-link">Resend{second ? ` (${second})` : ''}</span>
                    </span>
                    <button onClick={resetPwd} disabled={isSubmitting} className="w-full mt-4 py-2 relative text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-highlight disabled:cursor-not-allowed">
                        {isSubmitting && <ButtonSpinner />}
                        <span className={isSubmitting ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </form>
            </section>
        </section>
    );
}

ForgotPwdForm.propTypes = {
    email: PropTypes.string,
    setStep: PropTypes.func
};