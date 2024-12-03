import {useEffect} from 'react';

import {axiosController} from '../services/axios';

import {HelmetProvider, Helmet} from 'react-helmet-async';
import LoginForm from '../components/LoginForm';

export default function Login() {
    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>R Tracker - Login Page</title>
                <meta name="description" content="Login page for R Tracker. Secure login to track your expenses." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <LoginForm />
        </HelmetProvider>
    );
}