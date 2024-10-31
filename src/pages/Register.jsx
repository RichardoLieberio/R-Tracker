import {useState} from 'react';

import RegisterForm from '../components/RegisterForm';
import EmailVerification from '../components/EmailVerification';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [showConfPwd, setShowConfPwd] = useState(false);
    const [step, setStep] = useState('register');

    function stepHandler(nextStep) {
        setStep(nextStep);
    }

    switch (step) {
        case 'register':
            const registerFormState = {
                name, setName,
                email, setEmail,
                pwd, setPwd,
                confPwd, setConfPwd,
                showPwd, setShowPwd,
                showConfPwd, setShowConfPwd,
                stepHandler
            };
            return <RegisterForm {...registerFormState} />;
        case 'verification':
            const emailVerificationState = {
                email,
                stepHandler
            };
            return <EmailVerification {...emailVerificationState} />;
    }
}