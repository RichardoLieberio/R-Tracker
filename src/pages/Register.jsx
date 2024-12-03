import {useState, useEffect} from 'react';

import {axiosController} from '../services/axios';

import {HelmetProvider, Helmet} from 'react-helmet-async';
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

    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>R Tracker - Register</title>
                <meta name="description" content="Create an account on R Tracker to easily track your expenses and manage your financial goals." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {(function() {
                switch (step) {
                    case 'register':
                        const registerFormState = {
                            name, setName,
                            email, setEmail,
                            pwd, setPwd,
                            confPwd, setConfPwd,
                            formError, setFormError,
                            setStep
                        };
                        return <RegisterForm {...registerFormState} />;
                    case 'verification':
                        const emailVerificationState = {
                            name, email, pwd, confPwd,
                            setFormError,
                            setStep
                        };
                        return <EmailVerification {...emailVerificationState} />;
                    case 'verified':
                        return <EmailVerified />;
                }
            })()}
        </HelmetProvider>
    );

}