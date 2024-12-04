import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';

import {changePage} from '../redux/webSlice';

export default function User() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(function() {
        dispatch(changePage(location.pathname));

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <h1>User Page</h1>
    );
}