import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import getCSRFToken from '../services/getCSRFToken';

import contr from '../controllers/register';

import css from '../css/register';

import {IoArrowBack} from 'react-icons/io5';
import {MdErrorOutline} from 'react-icons/md';
import OtpInput from 'react-otp-input';
import ButtonSpinner from './ButtonSpinner';

export default function VerifyEmail(props) {
    const {
        name, email, pwd, confPwd,
        setFormError,
        setStep
    } = props;

    const [otp, setOtp] = useState('');
    const [csrfToken, setCSRFToken] = useState('');
    const [second, setSecond] = useState(+process.env.RESEND_EMAIL_TIMEOUT);
    const [otpError, setOtpError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resendRef = useRef(null);

    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(function() {
        getCSRFToken(setCSRFToken);
    }, []);

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

    function back() {
        setStep('register');
    }

    function resendOtp() {
        if (second === 0 && !isSubmitting) {
            resendRef.current.className = 'text-purple-link';
            setSecond(+process.env.RESEND_EMAIL_TIMEOUT);

            contr.resendOtp(name, email, pwd, confPwd, csrfToken, accessToken, setFormError, setStep);
        }
    }

    async function verify() {
        if (!isSubmitting) {
            setIsSubmitting(true);
            setOtpError('');
            await contr.verify(email, otp, csrfToken, accessToken, setFormError, setOtpError, setStep);
            setIsSubmitting(false);
        }
    }

    return (
        <section className="w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-full mx-auto py-8 flex flex-col gap-12">
            <section onClick={back} className="w-fit cursor-pointer">
                <IoArrowBack className="text-2xl text-purple-text" />
            </section>
            <section className="flex flex-col gap-8">
                <img src="/Email Verification.png" alt="Email Verification" loading="lazy" className="w-40 phone:w-48 tablet:w-56 desktop:w-64 mx-auto" />
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl text-purple-text font-semibold">Verify your email</h1>
                    <p className="text-purple-text">Check your email {email} for the OTP and enter it below to continue.</p>
                </div>
                <form className="w-fit mx-auto flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                    <div className="flex flex-col gap-2">
                        {
                            otpError
                            &&  <span className="flex items-center gap-1 text-purple-error">
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
                            renderInput={(props) => <input {...props} disabled={isSubmitting} />}
                            containerStyle="gap-1 phone:gap-2"
                            inputStyle={otpError ? css.errorOtp : css.otp}
                        />
                    </div>
                    <span className="text-sm text-purple-text">
                        Didn&apos;t receive your OTP? <span onClick={resendOtp} ref={resendRef} className="text-purple-link">Resend{second ? ` (${second})` : ''}</span>
                    </span>
                    <button onClick={verify} disabled={isSubmitting} className="w-full mt-4 py-2 relative text-purple-oppositeText bg-purple-primary rounded-md hover:bg-purple-highlight disabled:bg-purple-neutral disabled:cursor-not-allowed">
                        {isSubmitting && <ButtonSpinner />}
                        <span className={isSubmitting ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </form>
            </section>
        </section>
    );
}

VerifyEmail.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    pwd: PropTypes.string,
    confPwd: PropTypes.string,
    setFormError: PropTypes.func,
    setStep: PropTypes.func
};