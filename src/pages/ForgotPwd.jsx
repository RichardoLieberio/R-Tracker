import {useState, useEffect} from 'react';

import {axiosController} from '../services/axios';

import {HelmetProvider} from 'react-helmet-async';
import ForgotPwdHead from '../head/ForgotPwdHead';
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
            <ForgotPwdHead />
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