import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';
import {getToast} from '../services/toastService';
import getCSRFToken from '../services/getCSRFToken';

import {changePage} from '../redux/webSlice';

import {HelmetProvider} from 'react-helmet-async';
import ForgotPwdHead from '../head/ForgotPwdHead';
import ForgotPwdEmail from '../components/ForgotPwdEmail';
import ForgotPwdForm from '../components/ForgotPwdForm';

export default function ForgotPwd() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('email');
    const [csrfToken, setCSRFToken] = useState('');

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(function() {
        getToast();
        dispatch(changePage(location.pathname));
        getCSRFToken(setCSRFToken);

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <HelmetProvider>
            <ForgotPwdHead />
            <main className="w-full min-w-60 min-h-screen relative text-purple-text bg-purple-background">
                {(function() {
                    switch (step) {
                        case 'email':
                            const forgotPwdEmailState = {email, setEmail, step, setStep, csrfToken};
                            return <ForgotPwdEmail {...forgotPwdEmailState} />;
                        case 'form':
                            const forgotPwdFormState = {email, setStep, csrfToken};
                            return <ForgotPwdForm {...forgotPwdFormState} />;
                    }
                })()}
            </main>
        </HelmetProvider>
    );
}