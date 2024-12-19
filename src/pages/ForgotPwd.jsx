import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';

import {changePage} from '../redux/webSlice';

import {HelmetProvider} from 'react-helmet-async';
import ForgotPwdHead from '../head/ForgotPwdHead';
import ForgotPwdEmail from '../components/ForgotPwdEmail';
import ForgotPwdForm from '../components/ForgotPwdForm';

export default function ForgotPwd() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('email');

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(function() {
        dispatch(changePage(location.pathname));

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
                            const forgotPwdEmailState = {
                                email, setEmail,
                                step, setStep
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
            </main>
        </HelmetProvider>
    );
}