import {useState, useEffect} from 'react';

import {axiosController} from '../services/axios';

import ForgotPwdEmail from '../components/ForgotPwdEmail';
import ForgotPwdForm from '../components/ForgotPwdForm';

export default function ForgotPwd() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('form');

    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    switch (step) {
        case 'email':
            const forgotPwdEmailState = {
                email, setEmail,
                setStep
            };
            return <ForgotPwdEmail {...forgotPwdEmailState} />;
        case 'form':
            const forgotPwdFormState = {email};
            return <ForgotPwdForm {...forgotPwdFormState} />;
    }
}