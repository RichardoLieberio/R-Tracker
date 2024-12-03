import {useEffect} from 'react';

import {axiosController} from '../services/axios';

import {HelmetProvider} from 'react-helmet-async';
import LoginHead from '../head/LoginHead';
import LoginForm from '../components/LoginForm';

export default function Login() {
    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    return (
        <HelmetProvider>
            <LoginHead />
            <LoginForm />
        </HelmetProvider>
    );
}