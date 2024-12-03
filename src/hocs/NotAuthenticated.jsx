import {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import contr from '../controllers/hocs';

import Loading from '../components/Loading';

export default function NotAuthenticated(Component) {
    return function NotAuthenticatedWrapper(props) {
        const [loading, setLoading] = useState(true);

        const theme = useSelector((state) => state.theme.color);
        const accessToken = useSelector((state) => state.auth.accessToken);
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

        useEffect(function() {
            if (isAuthenticated) contr.getInfo(setLoading, accessToken);
        }, []); // eslint-disable-line react-hooks/exhaustive-deps

        return !isAuthenticated
        ? <Component {...props} />
        : loading
            ? <Loading defaultSize theme={theme} />
            : <Navigate to="/" />;
    }
}