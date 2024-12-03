import {useState, useEffect} from 'react';

import {axiosController} from '../services/axios';

import {HelmetProvider, Helmet} from 'react-helmet-async';
import ForgotPwdEmail from '../components/ForgotPwdEmail';
import ForgotPwdForm from '../components/ForgotPwdForm';

export default function ForgotPwd() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('email');

    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>R Tracker - Forgot Password</title>
                <meta name="description" content="Forgot your password? Reset it quickly and regain access to your R Tracker account to manage your expenses." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {(function() {
                switch (step) {
                    case 'email':
                        const forgotPwdEmailState = {
                            email, setEmail,
                            setStep
                        };
                        return <ForgotPwdEmail {...forgotPwdEmailState} />;
                    case 'form':
                        const forgotPwdFormState = {
                            email,
                            setStep
                        };
                        return <ForgotPwdForm {...forgotPwdFormState} />;
                }
            })()}
        </HelmetProvider>
    );
}