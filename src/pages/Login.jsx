import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';
import {getToast} from '../services/toastService';
import getCSRFToken from '../services/getCSRFToken';

import {changePage} from '../redux/webSlice';

import {HelmetProvider} from 'react-helmet-async';
import LoginHead from '../head/LoginHead';
import LoginForm from '../components/LoginForm';

export default function Login() {
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
            <LoginHead />
            <main className="w-full min-w-60 min-h-screen relative text-purple-text bg-purple-background">
                <LoginForm csrfToken={csrfToken} />
            </main>
        </HelmetProvider>
    );
}