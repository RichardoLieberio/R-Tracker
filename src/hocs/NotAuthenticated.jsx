import {useState, useEffect} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import contr from '../controllers/hocs';

import Loading from '../components/Loading';

export default function NotAuthenticated() {
    const [loading, setLoading] = useState(true);

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(function() {
        if (isAuthenticated) contr.getInfo(setLoading, false, accessToken);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return !isAuthenticated
    ? <Outlet />
    : loading
        ? <Loading defaultSize theme={theme} />
        : <Navigate to="/" replace />;
}