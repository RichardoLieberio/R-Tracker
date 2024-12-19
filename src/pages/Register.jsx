import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';
import {getToast} from '../services/toastService';
import getCSRFToken from '../services/getCSRFToken';

import {changePage} from '../redux/webSlice';

import {HelmetProvider} from 'react-helmet-async';
import RegisterHeead from '../head/RegisterHead';
import RegisterForm from '../components/RegisterForm';
import EmailVerification from '../components/EmailVerification';
import EmailVerified from '../components/EmailVerified';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [formError, setFormError] = useState({});
    const [step, setStep] = useState('register');
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
            <RegisterHeead />
            <main className="w-full min-w-60 min-h-screen relative text-purple-text bg-purple-background">
                {(function() {
                    switch (step) {
                        case 'register':
                            const registerFormState = {
                                name, setName,
                                email, setEmail,
                                pwd, setPwd,
                                confPwd, setConfPwd,
                                formError, setFormError,
                                setStep,
                                csrfToken
                            };
                            return <RegisterForm {...registerFormState} />;
                        case 'verification':
                            const emailVerificationState = {
                                name, email, pwd, confPwd,
                                setFormError,
                                setStep,
                                csrfToken
                            };
                            return <EmailVerification {...emailVerificationState} />;
                        case 'verified':
                            return <EmailVerified />;
                    }
                })()}
            </main>
        </HelmetProvider>
    );

}