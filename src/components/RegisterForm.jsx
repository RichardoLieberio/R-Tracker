import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function RegisterForm(props) {
    const {
        name, setName,
        email, setEmail,
        pwd, setPwd,
        confPwd, setConfPwd,
        showPwd, setShowPwd,
        showConfPwd, setShowConfPwd,
        stepHandler
    } = props;

    const nameLabelRef = useRef(null);
    const emailLabelRef = useRef(null);
    const pwdLabelRef = useRef(null);
    const pwdInputRef = useRef(null);
    const confPwdLabelRef = useRef(null);
    const confPwdInputRef = useRef(null);

    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    useEffect(function() {
        nameInputBlur();
        emailInputBlur();
        pwdInputBlur();
        confPwdInputBlur();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function nameHandler(e) {
        setName(e.target.value);
    }

    function nameInputFocus() {
        nameLabelRef.current.className = css.labelTopFocus;
    }

    function nameInputBlur() {
        nameLabelRef.current.className = name ? css.labelTopBlur : css.labelMiddle;
    }

    function emailHandler(e) {
        setEmail(e.target.value);
    }

    function emailInputFocus() {
        emailLabelRef.current.className = css.labelTopFocus;
    }

    function emailInputBlur() {
        emailLabelRef.current.className = email ? css.labelTopBlur : css.labelMiddle;
    }

    function pwdHandler(e) {
        setPwd(e.target.value);
    }

    function pwdInputFocus() {
        pwdLabelRef.current.className = css.labelTopFocus;
    }

    function pwdInputBlur() {
        pwdLabelRef.current.className = pwd ? css.labelTopBlur : css.labelMiddle;
    }

    function confPwdHandler(e) {
        setConfPwd(e.target.value);
    }

    function confPwdInputFocus() {
        confPwdLabelRef.current.className = css.labelTopFocus;
    }

    function confPwdInputBlur() {
        confPwdLabelRef.current.className = confPwd ? css.labelTopBlur : css.labelMiddle;
    }

    function togglePwd() {
        setShowPwd(value => !value);
        setTimeout(function() {
            pwdInputRef.current.focus();
            pwdInputRef.current.setSelectionRange(pwd.length, pwd.length);
        }, 0);
    }

    function toggleConfPwd() {
        setShowConfPwd(value => !value);
        setTimeout(function() {
            confPwdInputRef.current.focus();
            confPwdInputRef.current.setSelectionRange(confPwd.length, confPwd.length);
        }, 0);
    }

    function register() {
        stepHandler('verification');
    }

    const css = {
        labelMiddle: 'absolute left-3 bottom-1/2 translate-y-1/2 text-base text-purple-text transition-transform cursor-text',
        labelTopBlur: 'px-2 absolute left-1 -top-3 text-sm text-purple-text bg-purple-background transition-transform cursor-text',
        labelTopFocus: 'px-2 absolute left-1 -top-3 text-sm text-purple-primary bg-purple-background transition-transform cursor-text'
    }

    return (
        <div className="flex absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 overflow-hidden shadow-sm shadow-purple-shadow rounded-2xl tablet:rounded-3xl">
            {
                tabletBreakpoint &&
                <section className="w-56 h-auto phone:w-72 tablet:w-80 desktop:w-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/Register Image.jpeg")'}} />
            }
            <section className="w-56 phone:w-72 tablet:w-80 desktop:w-96 p-8 flex flex-col gap-12">
                <img src="/Logo.png" alt="R-Tracker Logo" width="32px" height="32px" />
                <form className="flex flex-col gap-6" autoCapitalize="off" autoComplete="off" autoCorrect="off">
                    <h1 className="text-2xl text-purple-text">Register</h1>
                    <section className="flex flex-col gap-4">
                        <div className="relative">
                            <label htmlFor="name" ref={nameLabelRef} className={css.labelMiddle}>Full Name</label>
                            <input type="text" id="name" value={name} onChange={nameHandler} onFocus={nameInputFocus} onBlur={nameInputBlur} className="w-full px-3 py-2 text-base text-purple-text border border-purple-neutral rounded-md outline-none focus:border-purple-primary disabled:bg-purple-disabled disabled:cursor-not-allowed" />
                        </div>
                        <div className="relative">
                            <label htmlFor="email" ref={emailLabelRef} className={css.labelMiddle}>Email</label>
                            <input type="email" id="email" value={email} onChange={emailHandler} onFocus={emailInputFocus} onBlur={emailInputBlur} className="w-full px-3 py-2 text-base text-purple-text border border-purple-neutral rounded-md outline-none focus:border-purple-primary disabled:bg-purple-disabled disabled:cursor-not-allowed" />
                        </div>
                        <div className="relative">
                            <label htmlFor="pwd" ref={pwdLabelRef} className={css.labelMiddle}>Password</label>
                            <input type={showPwd ? "text" : "password"} id="pwd" value={pwd} ref={pwdInputRef} onChange={pwdHandler} onFocus={pwdInputFocus} onBlur={pwdInputBlur} className="w-full px-3 py-2 pr-9 text-base text-purple-text border border-purple-neutral rounded-md outline-none focus:border-purple-primary disabled:bg-purple-disabled disabled:cursor-not-allowed" />
                            <div onClick={togglePwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                {
                                    showPwd
                                    ? <FaEyeSlash className="text-base text-purple-text" />
                                    : <FaEye className="text-base text-purple-text" />
                                }
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="confPwd" ref={confPwdLabelRef} className={css.labelMiddle}>Confirm Password</label>
                            <input type={showConfPwd ? "text" : "password"} id="confPwd" value={confPwd} ref={confPwdInputRef} onChange={confPwdHandler} onFocus={confPwdInputFocus} onBlur={confPwdInputBlur} className="w-full px-3 py-2 pr-9 text-base text-purple-text border border-purple-neutral rounded-md outline-none focus:border-purple-primary disabled:bg-purple-disabled disabled:cursor-not-allowed" />
                            <div onClick={toggleConfPwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                {
                                    showConfPwd
                                    ? <FaEyeSlash className="text-base text-purple-text" />
                                    : <FaEye className="text-base text-purple-text" />
                                }
                            </div>
                        </div>
                        <button onClick={register} className="py-2 text-base text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-highlight disabled:cursor-not-allowed">Register</button>
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
    showPwd: PropTypes.string,
    setShowPwd: PropTypes.func,
    showConfPwd: PropTypes.string,
    setShowConfPwd: PropTypes.func,
    stepHandler: PropTypes.func
};