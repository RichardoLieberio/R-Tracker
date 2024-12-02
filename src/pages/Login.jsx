import {useEffect} from 'react';

import {axiosController} from '../services/axios';

import LoginForm from '../components/LoginForm';

export default function Login() {
    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    return (
        <LoginForm />
    );
}