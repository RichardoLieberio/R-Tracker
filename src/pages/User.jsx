import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';

import contr from '../controllers/user';

export default function User() {
    const location = useLocation();
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.auth.accessToken);
    const users = useSelector((state) => state.data.users);

    useEffect(function() {
        getToast();

        dispatch(changePage(location.pathname));
        !users && contr.getAllUsers(accessToken);

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <h1>User Page</h1>
    );
}