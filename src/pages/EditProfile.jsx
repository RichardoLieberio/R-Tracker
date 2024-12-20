import {useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';

import themeConfig from '../../config/theme';

import contr from '../controllers/editProfile';

import {
    getBgPrimaryColor, getBackgroundColor, getBgErrorColor,
    getHoverBgHighlightColor, getHoverBgErrorColor,
    getDisabledBgNeutralColor,
    getOppositeTextColor, getTextErrorColor,
    getHoverOppositeTextColor,
    getDisabledOppositeTextColor,
    getBorderNeutralColor, getBorderErrorColor
} from '../css/color';
import css from '../css/editProfile';

import {HelmetProvider} from 'react-helmet-async';
import EditProfileHead from '../head/EditProfileHead';
import {MoonLoader} from 'react-spinners';
import {FaPencilAlt, FaEye, FaEyeSlash} from 'react-icons/fa';
import {MdErrorOutline} from 'react-icons/md';
import EditNameModal from '../components/EditNameModal';
import EditEmailModal from '../components/EditEmailModal';
import ConfirmDeactiveAccount from '../components/ConfirmDeactiveAccount';
import Tooltip from '../components/Tooltip';
import ButtonSpinner from '../components/ButtonSpinner';

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

    const [oldPwd, setOldPwd] = useState('');
    const [showOldPwd, setShowOldPwd] = useState(false);
    const [newPwd, setNewPwd] = useState('');
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [confPwd, setConfPwd] = useState('');
    const [showConfPwd, setShowConfPwd] = useState(false);

    const [savingNewPwd, setSavingNewPwd] = useState(false);
    const [pwdError, setPwdError] = useState({});

    const [confirmationModal, setConfirmationModal] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    const oldPwdLabelRef = useRef(null);
    const oldPwdInputRef = useRef(null);
    const newPwdLabelRef = useRef(null);
    const newPwdInputRef = useRef(null);
    const confPwdLabelRef = useRef(null);
    const confPwdInputRef = useRef(null);
    const hasToggled = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

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
        contr.inputEffect(theme, oldPwdLabelRef, oldPwdInputRef, oldPwd, pwdError.oldPwd);
    }, [theme, oldPwd, pwdError.oldPwd]);

    useEffect(function() {
        contr.inputEffect(theme, newPwdLabelRef, newPwdInputRef, newPwd, pwdError.newPwd);
    }, [theme, newPwd, pwdError.newPwd]);

    useEffect(function() {
        contr.inputEffect(theme, confPwdLabelRef, confPwdInputRef, confPwd, pwdError.confPwd);
    }, [theme, confPwd, pwdError.confPwd]);

    useEffect(function() {
        hasToggled.current && oldPwdInputRef.current && oldPwdInputRef.current.focus();
    }, [showOldPwd]);

    useEffect(function() {
        hasToggled.current && newPwdInputRef.current && newPwdInputRef.current.focus();
    }, [showNewPwd]);

    useEffect(function() {
        hasToggled.current && confPwdInputRef.current && confPwdInputRef.current.focus();
    }, [showConfPwd]);

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

    function oldPwdHandler(e) {
        setOldPwd(e.target.value);
    }

    function oldPwdInputFocus() {
        if (pwdError.oldPwd) oldPwdLabelRef.current.className = css(theme).labelTopError
        else oldPwdLabelRef.current.className = css(theme).labelTopFocus;
    }

    function oldPwdInputBlur() {
        if (pwdError.oldPwd) oldPwdLabelRef.current.className = oldPwd ? css(theme).labelTopError : css(theme).labelMiddleError
        else oldPwdLabelRef.current.className = oldPwd ? css(theme).labelTopBlur : css(theme).labelMiddle;
    }

    function newPwdHandler(e) {
        setNewPwd(e.target.value);
    }

    function newPwdInputFocus() {
        if (pwdError.newPwd) newPwdLabelRef.current.className = css(theme).labelTopError
        else newPwdLabelRef.current.className = css(theme).labelTopFocus;
    }

    function newPwdInputBlur() {
        if (pwdError.newPwd) newPwdLabelRef.current.className = newPwd ? css(theme).labelTopError : css(theme).labelMiddleError
        else newPwdLabelRef.current.className = newPwd ? css(theme).labelTopBlur : css(theme).labelMiddle;
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

    function toggleOldPwd() {
        setShowOldPwd(value => !value);
        hasToggled.current = true;
    }

    function toggleNewPwd() {
        setShowNewPwd(value => !value);
        hasToggled.current = true;
    }

    function toggleConfPwd() {
        setShowConfPwd(value => !value);
        hasToggled.current = true;
    }

    async function changePwd() {
        if (!savingNewPwd) {
            setSavingNewPwd(true);
            setPwdError({});
            await contr.changePwd(oldPwd, setOldPwd, newPwd, setNewPwd, confPwd, setConfPwd, csrfToken, accessToken, setPwdError);
            setSavingNewPwd(false);
        }
    }

    async function deactivate() {
        if (!deactivating) {
            setDeactivating(true);
            setConfirmationModal(false);
            await contr.deactivate(csrfToken, accessToken, navigate);
            setDeactivating(false);
        }
    }

    const editNameProps = {newName, setNewName, nameModal, setNameModal, nameError, savingNewName, saveName};
    const editEmailProps = {step, setStep, newEmail, setNewEmail, emailError, otp, setOtp, otpError, emailModal, setEmailModal, savingNewEmail, requestChangeEmail, resendOtp, changeEmail};
    const deactiveProps = {confirmationModal, setConfirmationModal, deactivating, deactivate};

    return (
        <HelmetProvider>
            <EditProfileHead />
            <section className="w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 mx-auto py-8 pb-16 flex flex-col gap-12">
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
                        <form onKeyDown={(e) => e.key === 'Enter' && changePwd()} className="flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                            <div className="relative">
                                {
                                    pwdError.oldPwd
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={pwdError.oldPwd} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="oldPwd" ref={oldPwdLabelRef} className={css(theme).labelMiddle}>Current Password</label>
                                <input type={showOldPwd ? "text" : "password"} id="oldPwd" value={oldPwd} ref={oldPwdInputRef} disabled={savingNewPwd} onChange={oldPwdHandler} onFocus={oldPwdInputFocus} onBlur={oldPwdInputBlur} className={css(theme).pwdInput} />
                                <div onClick={toggleOldPwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                    {
                                        showOldPwd
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }
                                </div>
                            </div>
                            <div className="relative">
                                {
                                    pwdError.newPwd
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={pwdError.newPwd} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="newPwd" ref={newPwdLabelRef} className={css(theme).labelMiddle}>New Password</label>
                                <input type={showNewPwd ? "text" : "password"} id="newPwd" value={newPwd} ref={newPwdInputRef} disabled={savingNewPwd} onChange={newPwdHandler} onFocus={newPwdInputFocus} onBlur={newPwdInputBlur} className={css(theme).pwdInput} />
                                <div onClick={toggleNewPwd} className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer">
                                    {
                                        showNewPwd
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
                        <button onClick={changePwd} disabled={savingNewPwd} className={`py-1 px-8 relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                            {savingNewPwd && <ButtonSpinner />}
                            <span className={savingNewPwd ? 'opacity-0' : ''}>Change password</span>
                        </button>
                    </footer>
                </section>
                <section className="flex flex-col gap-8">
                    <header className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">Account Deactivation</h2>
                        <p className="text-sm">Once you deactivate your account, all your data will be permanently deleted, and this action cannot be undone.</p>
                    </header>
                    <main>
                        <button onClick={() => setConfirmationModal(true)} disabled={deactivating} className={`py-1 px-8 relative ${getTextErrorColor(theme)} ${deactivating ? '' : `border ${getBorderErrorColor(theme)}`} rounded-md ${getHoverOppositeTextColor(theme)} ${getHoverBgErrorColor(theme)} ${getDisabledBgNeutralColor(theme)} ${getDisabledOppositeTextColor(theme)} disabled:cursor-not-allowed`}>
                            {deactivating && <ButtonSpinner />}
                            <span className={deactivating ? 'opacity-0' : ''}>Deactivate account</span>
                        </button>
                        <ConfirmDeactiveAccount {...deactiveProps} />
                    </main>
                </section>
            </section>
        </HelmetProvider>
    );
}