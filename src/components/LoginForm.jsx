import {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const emailLabelRef = useRef(null);
    const pwdLabelRef = useRef(null);
    const pwdInputRef = useRef(null);

    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

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

    function rememberMeHandler(e) {
        setRememberMe(e.target.checked);
    }

    function togglePwd() {
        setShowPwd(value => !value);
        setTimeout(function() {
            pwdInputRef.current.focus();
            pwdInputRef.current.setSelectionRange(pwd.length, pwd.length);
        }, 0);
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
                <section className="w-56 h-auto phone:w-72 tablet:w-80 desktop:w-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/Login Image.jpeg")'}} />
            }
            <section className="w-56 phone:w-72 tablet:w-80 desktop:w-96 p-8 flex flex-col gap-12">
                <img src="/Logo.png" alt="R-Tracker Logo" width="32px" height="32px" />
                <form className="flex flex-col gap-6" autoCapitalize="off" autoComplete="off" autoCorrect="off">
                    <h1 className="text-2xl text-purple-text">Login</h1>
                    <section className="flex flex-col gap-4">
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
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={rememberMeHandler} className="w-4 h-4 accent-purple-primary cursor-pointer" />
                            <label htmlFor="rememberMe" className="text-base text-purple-text cursor-pointer">Remember me</label>
                        </div>
                        <button className="py-2 text-base text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-highlight disabled:cursor-not-allowed">Login</button>
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