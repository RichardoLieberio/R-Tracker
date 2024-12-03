import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {axiosController} from '../services/axios';

import {HelmetProvider} from 'react-helmet-async';
import DashboardHead from '../head/DashboardHead';

export default function Dashboard() {
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(function() {
        return function() {
            axiosController && axiosController.abort();
        }
    }, []);

    return (
        <HelmetProvider>
            <DashboardHead />
            <h1>Dashboard Page</h1>
            <p>{accessToken}</p>
        </HelmetProvider>
    );
}