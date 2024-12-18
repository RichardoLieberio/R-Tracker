import {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';

import themeConfig from '../../config/theme';

import contr from '../controllers/editProfile';

import {
    getBgPrimaryColor, getBackgroundColor,
    getHoverBgHighlightColor, getHoverBgErrorColor,
    getOppositeTextColor, getTextErrorColor,
    getHoverOppositeTextColor,
    getBorderNeutralColor, getBorderErrorColor
} from '../css/color';
import css from '../css/editProfile';

import {HelmetProvider} from 'react-helmet-async';
import EditProfileHead from '../head/EditProfileHead';
import {MoonLoader} from 'react-spinners';
import {FaPencilAlt, FaEye, FaEyeSlash} from 'react-icons/fa';
import EditNameModal from '../components/EditNameModal';
import EditEmailModal from '../components/EditEmailModal';

export default function EditProfile() {
    const [csrfToken, setCSRFToken] = useState('');

    const [newName, setNewName] = useState('');
    const [nameModal, setNameModal] = useState(false);
    const [savingNewName, setSavingNewName] = useState(false);
    const [nameError, setNameError] = useState({});

    const [newEmail, setNewEmail] = useState('');
    const [emailModal, setEmailModal] = useState(false);
    const [savingNewEmail, setSavingNewEmail] = useState(false);
    const [emailError, setEmailError] = useState({});

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [step, setStep] = useState('email');

    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [confPwd, setConfPwd] = useState('');
    const [showConfPwd, setShowConfPwd] = useState(false);
    const [savingNewPwd, setSavingNewPwd] = useState(false);
    const [pwdError, setPwdError] = useState({});

    const pwdLabelRef = useRef(null);
    const pwdInputRef = useRef(null);
    const confPwdLabelRef = useRef(null);
    const confPwdInputRef = useRef(null);
    const hasToggled = useRef(null);

    const location = useLocation();

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userInfo = useSelector((state) => state.auth.userInfo);

    const dispatch = useDispatch();

    useEffect(function() {
        getToast();
        dispatch(changePage(location.pathname));
        getCSRFToken(setCSRFToken);

        return function() {
            axiosController && axiosController.abort();
        }
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

    function openNameModal() {
        !savingNewName && setNameModal(true);
    }

    async function saveName() {
        if (!savingNewName) {
            setSavingNewName(true);
            setNameError({});
            await contr.changeName(newName, csrfToken, accessToken, setNameError, setNewName, userInfo.name, setNameModal);
            setSavingNewName(false);
        }
    }

    function openEmailModal() {
        !(savingNewEmail && step !== 'email') && setEmailModal(true);
    }

    async function requestChangeEmail() {
        if (!savingNewEmail) {
            setSavingNewEmail(true);
            setEmailError({});
            await contr.requestChangeEmail(newEmail, csrfToken, accessToken, setEmailError, userInfo.email, setStep);
            setSavingNewEmail(false);
        }
    }

    function resendOtp() {
        contr.resendOtp(newEmail, csrfToken, accessToken, setEmailError, setStep);
    }

    async function changeEmail() {
        if (!savingNewEmail) {
            setSavingNewEmail(true);
            setOtpError('');
            await contr.changeEmail(newEmail, setNewEmail, setEmailError, otp, setOtp, setOtpError, csrfToken, accessToken, setStep, setEmailModal);
            setSavingNewEmail(false);
        }
    }

    function pwdHandler(e) {
        setPwd(e.target.value);
    }

    function pwdInputFocus() {
        if (pwdError.pwd) pwdLabelRef.current.className = css(theme).labelTopError
        else pwdLabelRef.current.className = css(theme).labelTopFocus;
    }

    function pwdInputBlur() {
        if (pwdError.pwd) pwdLabelRef.current.className = pwd ? css(theme).labelTopError : css(theme).labelMiddleError
        else pwdLabelRef.current.className = pwd ? css(theme).labelTopBlur : css(theme).labelMiddle;
    }

    function confPwdHandler(e) {
        setConfPwd(e.target.value);
    }

    function confPwdInputFocus() {
        if (pwdError.confPwd) confPwdLabelRef.current.className = css(theme).labelTopError
        else confPwdLabelRef.current.className = css(theme).labelTopFocus;
    }

    function confPwdInputBlur() {
        if (pwdError.confPwd) confPwdLabelRef.current.className = confPwd ? css(theme).labelTopError : css(theme).labelMiddleError
        else confPwdLabelRef.current.className = confPwd ? css(theme).labelTopBlur : css(theme).labelMiddle;
    }

    function togglePwd() {
        setShowPwd(value => !value);
        hasToggled.current = true;
    }

    function toggleConfPwd() {
        setShowConfPwd(value => !value);
        hasToggled.current = true;
    }

    const editNameProps = {newName, setNewName, nameModal, setNameModal, nameError, savingNewName, saveName};
    const editEmailProps = {step, setStep, newEmail, setNewEmail, emailError, otp, setOtp, otpError, emailModal, setEmailModal, savingNewEmail, requestChangeEmail, resendOtp, changeEmail};

    return (
        <HelmetProvider>
            <EditProfileHead />
            <section className="w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 mx-auto py-12 flex flex-col gap-12">
                <section className="flex flex-col gap-8">
                    <header className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">My Account</h2>
                        <p className="text-sm">Manage your personal information, update your email, and keep your profile up to date.</p>
                    </header>
                    <main className="flex flex-col gap-4">
                        <div className="relative flex flex-col">
                            <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)} transition-transform cursor-text`}>Name</span>
                            <span className={`w-full px-3 py-2 pr-10 truncate border ${getBorderNeutralColor(theme)} rounded-md`}>{userInfo.name}</span>
                            <div onClick={openNameModal} className={`px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md ${savingNewName ? 'cursor-default' : 'cursor-pointer'}`}>
                                {
                                    savingNewName
                                    ? <MoonLoader size={16} color={themeConfig[theme].text} />
                                    : <FaPencilAlt />
                                }
                            </div>
                            <EditNameModal {...editNameProps} />
                        </div>
                        <div className="relative flex flex-col">
                            <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)} transition-transform cursor-text`}>Email</span>
                            <span className={`w-full px-3 py-2 pr-10 truncate border ${getBorderNeutralColor(theme)} rounded-md`}>{userInfo.email}</span>
                            <div onClick={openEmailModal} className={`px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md ${savingNewEmail ? 'cursor-default' : 'cursor-pointer'}`}>
                                {
                                    savingNewEmail && step !== 'email'
                                    ? <MoonLoader size={16} color={themeConfig[theme].text} />
                                    : <FaPencilAlt />
                                }
                            </div>
                            <EditEmailModal {...editEmailProps} />
                        </div>
                    </main>
                </section>
                <section className="flex flex-col gap-8">
                    <header className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">Set New Password</h2>
                        <p className="text-sm">Enter your new password and confirm it to update your login credentials.</p>
                    </header>
                    <main>
                        <form action="" className="flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                            <div className="relative">
                                <label htmlFor="pwd" ref={pwdLabelRef} className={css(theme).labelMiddle}>New Password</label>
                                <input type={showPwd ? "text" : "password"} id="pwd" value={pwd} ref={pwdInputRef} disabled={savingNewPwd} onChange={pwdHandler} onFocus={pwdInputFocus} onBlur={pwdInputBlur} className={css(theme).pwdInput} />
                                <div onClick={togglePwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                    {
                                        showPwd
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }
                                </div>
                            </div>
                            <div className="relative">
                                <label htmlFor="confPwd" ref={confPwdLabelRef} className={css(theme).labelMiddle}>Confirm New Password</label>
                                <input type={showConfPwd ? "text" : "password"} id="confPwd" value={confPwd} ref={confPwdInputRef} disabled={savingNewPwd} onChange={confPwdHandler} onFocus={confPwdInputFocus} onBlur={confPwdInputBlur} className={css(theme).pwdInput} />
                                <div onClick={toggleConfPwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                    {
                                        showConfPwd
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }
                                </div>
                            </div>
                        </form>
                    </main>
                    <footer className="text-end">
                        <button className={`py-1 px-8 ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)}`}>Change Password</button>
                    </footer>
                </section>
                <section className="flex flex-col gap-8">
                    <header className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">Account Deactivation</h2>
                        <p className="text-sm">Once you deactivate your account, all your data will be permanently deleted, and this action cannot be undone.</p>
                    </header>
                    <main>
                        <button className={`py-1 px-8 ${getTextErrorColor(theme)} border ${getBorderErrorColor(theme)} rounded-md ${getHoverOppositeTextColor(theme)} ${getHoverBgErrorColor(theme)}`}>Deactivate Account</button>
                    </main>
                </section>
            </section>
        </HelmetProvider>
    );
}