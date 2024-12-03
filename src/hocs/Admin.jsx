import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Admin() {
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return isAdmin
    ? <Outlet />
    : <Navigate to="/" />;
}