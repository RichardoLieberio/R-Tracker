import {useState, useEffect, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import contr from '../controllers/loginForm';

import css from '../css/loginForm';

import Tooltip from './Tooltip';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {MdErrorOutline} from 'react-icons/md';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [csrfToken, setCSRFToken] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [formError, setFormError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailLabelRef = useRef(null);
    const emailInputRef = useRef(null);
    const pwdLabelRef = useRef(null);
    const pwdInputRef = useRef(null);
    const hasToggled = useRef(null);

    const navigate = useNavigate();

    const accessToken = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();

    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    useEffect(function() {
        getToast();
        getCSRFToken(setCSRFToken);

        emailInputBlur();
        pwdInputBlur();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        if (hasToggled.current && pwdInputRef.current) {
            pwdInputRef.current.focus();
            pwdInputRef.current.setSelectionRange(pwd.length, pwd.length);
        }
    }, [hasToggled, showPwd, pwd]);

    useEffect(function() {
        contr.inputErrorHandler(formError.email, email, emailLabelRef, emailInputRef);
        contr.inputErrorHandler(formError.pwd, pwd, pwdLabelRef, pwdInputRef, true);
    }, [formError]); // eslint-disable-line react-hooks/exhaustive-deps

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

    function rememberMeHandler(e) {
        setRememberMe(e.target.checked);
    }

    function togglePwd() {
        setShowPwd(value => !value);
        hasToggled.current = true;
    }

    async function login() {
        if (!isSubmitting) {
            setIsSubmitting(true);
            setFormError({});
            await contr.login(email, pwd, rememberMe, csrfToken, accessToken, setFormError, dispatch, navigate);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 overflow-hidden shadow-sm shadow-purple-shadow rounded-2xl tablet:rounded-3xl">
            {
                tabletBreakpoint &&
                <section className="w-56 h-auto phone:w-72 tablet:w-80 desktop:w-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/Login Image.jpeg")'}} />
            }
            <section className="w-56 phone:w-72 tablet:w-80 desktop:w-96 p-8 flex flex-col gap-12">
                <img src="/Logo.png" alt="R-Tracker Logo" width="32px" height="32px" />
                <form className="flex flex-col gap-6" autoCapitalize="off" autoComplete="off" spellCheck="false">
                    <h1 className="text-2xl text-purple-text">Login</h1>
                    <section className="flex flex-col gap-4">
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="rememberMe" checked={rememberMe} disabled={isSubmitting} onChange={rememberMeHandler} className="w-4 h-4 accent-purple-primary cursor-pointer disabled:accent-purple-disabled disabled:cursor-not-allowed" />
                                <label htmlFor="rememberMe" className="text-base text-purple-text cursor-pointer">Remember me</label>
                            </div>
                            {
                                tabletBreakpoint
                                && <Link to="/forgot-password" className="text-sm text-purple-link cursor-pointer hover:underline">Forgot password?</Link>
                            }
                        </div>
                        <button onClick={login} disabled={isSubmitting} className="py-2 text-base text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-highlight disabled:cursor-not-allowed">Login</button>
                        {
                            !tabletBreakpoint
                            &&  <span className="w-full text-center">
                                    <Link to="/forgot-password" className="text-sm text-purple-link cursor-pointer hover:underline">Forgot password?</Link>
                                </span>
                        }
                    </section>
                    <small className="mx-auto text-sm text-purple-text">
                        Don&apos;t have an account? <Link to="/register" className="text-purple-link hover:underline">Register</Link>
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