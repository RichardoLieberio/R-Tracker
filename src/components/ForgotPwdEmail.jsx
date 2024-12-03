import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import contr from '../controllers/forgotPwdEmail';

import css from '../css/forgotPwdEmail';

import Tooltip from './Tooltip';
import {MdErrorOutline} from 'react-icons/md';

export default function ForgotPwdEmail(props) {
    const {email, setEmail, setStep} = props;
    const [csrfToken, setCSRFToken] = useState('');
    const [formError, setFormError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailLabelRef = useRef(null);
    const emailInputRef = useRef(null);

    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(function() {
        getToast();
        getCSRFToken(setCSRFToken);
        emailInputBlur();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        contr.inputErrorHandler(formError.email, email, emailLabelRef, emailInputRef);
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

    async function sendRequest(e) {
        e.preventDefault();

        if (!isSubmitting) {
            setIsSubmitting(true);
            setFormError({});
            await contr.requestResetPwd(email, csrfToken, accessToken, setFormError, setStep);
            setIsSubmitting(false);
        }
    }

    return (
        <section className="w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-full mx-auto py-8 pt-32 flex flex-col gap-8">
            <img src="/Email Verification.png" alt="Email Verification" className="w-40 phone:w-48 tablet:w-56 desktop:w-64 mx-auto" />
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl text-purple-text font-semibold">Reset your password</h1>
                <p className="text-base text-purple-text">Enter your email address below, and we&apos;ll send you a one-time password (OTP) to verify your identity.</p>
            </div>
            <form className="w-fit phone:w-56 tablet:w-64 desktop:w-72 mx-auto flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                <div className="w-full relative">
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
                <button onClick={sendRequest} disabled={isSubmitting} className="w-full mt-4 py-2 text-base text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-highlight disabled:cursor-not-allowed">Submit</button>
                <Link to="/login" rel="nofollow" className="mx-auto text-sm text-purple-link hover:underline">Back to login</Link>
            </form>
        </section>
    );
}

ForgotPwdEmail.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
    setStep: PropTypes.func
};