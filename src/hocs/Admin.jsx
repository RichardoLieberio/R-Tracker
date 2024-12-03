import {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import contr from '../controllers/hocs';

import Loading from '../components/Loading';

export default function Admin(Component) {
    return function AdminWrapper(props) {
        const [loading, setLoading] = useState(true);

        const theme = useSelector((state) => state.theme.color);
        const accessToken = useSelector((state) => state.auth.accessToken);
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
        const isAdmin = useSelector((state) => state.auth.isAdmin);

        useEffect(function() {
            if (!isAuthenticated) contr.getInfo(setLoading, accessToken);
        }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

        return isAdmin
        ? <Component {...props} />
        : isAuthenticated
            ? <Navigate to="/" />
            : loading
                ? <Loading defaultSize theme={theme} />
                : <Navigate to="/login" />;
    }
}