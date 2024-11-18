import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import contr from '../controllers/registerForm';

import css from '../css/registerForm';

import Tooltip from './Tooltip';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {MdErrorOutline} from 'react-icons/md';

export default function RegisterForm(props) {
    const {
        name, setName,
        email, setEmail,
        pwd, setPwd,
        confPwd, setConfPwd,
        formError, setFormError,
        setStep
    } = props;

    const [csrfToken, setCSRFToken] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [showConfPwd, setShowConfPwd] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nameLabelRef = useRef(null);
    const nameInputRef = useRef(null);
    const emailLabelRef = useRef(null);
    const emailInputRef = useRef(null);
    const pwdLabelRef = useRef(null);
    const pwdInputRef = useRef(null);
    const confPwdLabelRef = useRef(null);
    const confPwdInputRef = useRef(null);
    const hasToggled = useRef(false);

    const accessToken = useSelector((state) => state.auth.accessToken);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    useEffect(function() {
        getToast();
        getCSRFToken(setCSRFToken);

        nameInputBlur();
        emailInputBlur();
        pwdInputBlur();
        confPwdInputBlur();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        if (hasToggled.current && pwdInputRef.current) {
            pwdInputRef.current.focus();
            pwdInputRef.current.setSelectionRange(pwd.length, pwd.length);
        }
    }, [hasToggled, showPwd, pwd]);

    useEffect(function() {
        if (hasToggled.current && confPwdInputRef.current) {
            confPwdInputRef.current.focus();
            confPwdInputRef.current.setSelectionRange(confPwd.length, confPwd.length);
        }
    }, [hasToggled, showConfPwd, confPwd]);

    useEffect(function() {
        contr.inputErrorHandler(formError.name, name, nameLabelRef, nameInputRef);
        contr.inputErrorHandler(formError.email, email, emailLabelRef, emailInputRef);
        contr.inputErrorHandler(formError.pwd, pwd, pwdLabelRef, pwdInputRef, true);
        contr.inputErrorHandler(formError.confPwd, confPwd, confPwdLabelRef, confPwdInputRef, true);
    }, [formError]); // eslint-disable-line react-hooks/exhaustive-deps

    function nameHandler(e) {
        setName(e.target.value);
    }

    function nameInputFocus() {
        if (formError.name) nameLabelRef.current.className = css.labelTopError
        else nameLabelRef.current.className = css.labelTopFocus;
    }

    function nameInputBlur() {
        if (formError.name) nameLabelRef.current.className = name ? css.labelTopError : css.labelMiddleError
        else nameLabelRef.current.className = name ? css.labelTopBlur : css.labelMiddle;
    }

    function emailHandler(e) {
        setEmail(e.target.value);
    }

    function emailInputFocus() {
        if (formError.email) emailLabelRef.current.className = css.labelTopError
        else emailLabelRef.current.className = css.labelTopFocus;
    }

    function emailInputBlur() {
        if (formError.email) emailLabelRef.current.className = email ? css.labelTopError : css.labelMiddleError
        else emailLabelRef.current.className = email ? css.labelTopBlur : css.labelMiddle;
    }

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

    function togglePwd() {
        setShowPwd(value => !value);
        hasToggled.current = true;
    }

    function toggleConfPwd() {
        setShowConfPwd(value => !value);
        hasToggled.current = true;
    }

    async function register() {
        if (!isSubmitting) {
            setIsSubmitting(true);
            setFormError({});
            await contr.register(name, email, pwd, confPwd, csrfToken, accessToken, setFormError, setStep);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 overflow-hidden shadow-sm shadow-purple-shadow rounded-2xl tablet:rounded-3xl">
            {
                tabletBreakpoint &&
                <section className="w-56 h-auto phone:w-72 tablet:w-80 desktop:w-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/Register Image.jpeg")'}} />
            }
            <section className="w-56 phone:w-72 tablet:w-80 desktop:w-96 p-8 flex flex-col gap-12">
                <img src="/Logo.png" alt="R-Tracker Logo" width="32px" height="32px" />
                <form className="flex flex-col gap-6" autoCapitalize="off" autoComplete="off" spellCheck="false">
                    <h1 className="text-2xl text-purple-text">Register</h1>
                    <section className="flex flex-col gap-4">
                        <div className="relative">
                            {
                                formError.name
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={formError.name} placement="top-start" posY={-8} className="w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm text-purple-oppositeText bg-purple-error rounded-md">
                                            <MdErrorOutline className="text-lg text-purple-error" />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="name" ref={nameLabelRef}>Full Name</label>
                            <input type="text" id="name" value={name} ref={nameInputRef} disabled={isSubmitting} onChange={nameHandler} onFocus={nameInputFocus} onBlur={nameInputBlur} className={css.defaultInput} />
                        </div>
                        <div className="relative">
                            {
                                formError.email
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={formError.email} placement="top-start" posY={-8} className="w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm text-purple-oppositeText bg-purple-error rounded-md">
                                            <MdErrorOutline className="text-lg text-purple-error" />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="email" ref={emailLabelRef}>Email</label>
                            <input type="email" id="email" value={email} ref={emailInputRef} disabled={isSubmitting} onChange={emailHandler} onFocus={emailInputFocus} onBlur={emailInputBlur} className={css.defaultInput} />
                        </div>
                        <div className="relative">
                            {
                                formError.pwd
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={formError.pwd} placement="top-start" posY={-8} className="w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm text-purple-oppositeText bg-purple-error rounded-md">
                                            <MdErrorOutline className="text-lg text-purple-error" />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="pwd" ref={pwdLabelRef}>Password</label>
                            <input type={showPwd ? "text" : "password"} id="pwd" value={pwd} ref={pwdInputRef} disabled={isSubmitting} onChange={pwdHandler} onFocus={pwdInputFocus} onBlur={pwdInputBlur} className={css.pwdInput} />
                            <div onClick={togglePwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                {
                                    showPwd
                                    ? <FaEyeSlash className="text-base text-purple-text" />
                                    : <FaEye className="text-base text-purple-text" />
                                }
                            </div>
                        </div>
                        <div className="relative">
                            {
                                formError.confPwd
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={formError.confPwd} placement="top-start" posY={-8} className="w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm text-purple-oppositeText bg-purple-error rounded-md">
                                            <MdErrorOutline className="text-lg text-purple-error" />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="confPwd" ref={confPwdLabelRef}>{phoneBreakpoint ? 'Confirm Password' : 'Confirm'}</label>
                            <input type={showConfPwd ? "text" : "password"} id="confPwd" value={confPwd} ref={confPwdInputRef} disabled={isSubmitting} onChange={confPwdHandler} onFocus={confPwdInputFocus} onBlur={confPwdInputBlur} className={css.pwdInput} />
                            <div onClick={toggleConfPwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                {
                                    showConfPwd
                                    ? <FaEyeSlash className="text-base text-purple-text" />
                                    : <FaEye className="text-base text-purple-text" />
                                }
                            </div>
                        </div>
                        <button onClick={register} disabled={isSubmitting} className="py-2 text-base text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-highlight disabled:cursor-not-allowed">Register</button>
                    </section>
                    <small className="mx-auto text-sm text-purple-text">
                        Already have an account? <Link to="/login" className="text-purple-link hover:underline">Login</Link>
                    </small>
                </form>
                <footer className="flex flex-col items-center gap-2">
                    <small className="text-sm text-purple-text">Contact us</small>
                    <span className="flex gap-4 tablet:gap-6">
                        <a href={process.env.GITHUB_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Github.png" alt="Github Icon" width="32px" height="32px" />
                        </a>
                        <a href={process.env.LINKEDIN_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Linkedin.png" alt="Linkedin Icon" width="32px" height="32px" />
                        </a>
                        <a href={process.env.INSTAGRAM_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Instagram.png" alt="Instagram Icon" width="32px" height="32px" />
                        </a>
                        <a href={process.env.WHATSAPP_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Whatsapp.png" alt="Whatsapp Icon" width="32px" height="32px" />
                        </a>
                    </span>
                </footer>
            </section>
        </div>
    );
}

RegisterForm.propTypes = {
    name: PropTypes.string,
    setName: PropTypes.func,
    email: PropTypes.string,
    setEmail: PropTypes.func,
    pwd: PropTypes.string,
    setPwd: PropTypes.func,
    confPwd: PropTypes.string,
    setConfPwd: PropTypes.func,
    formError: PropTypes.object,
    setFormError: PropTypes.func,
    setStep: PropTypes.func
};