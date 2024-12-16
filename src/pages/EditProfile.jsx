import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {axiosController} from '../services/axios';

import {changePage} from '../redux/webSlice';

import {HelmetProvider} from 'react-helmet-async';
import EditProfileHead from '../head/EditProfileHead';

export default function EditProfile() {
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(function() {
        dispatch(changePage(location.pathname));

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <HelmetProvider>
            <EditProfileHead />
            <h1 className="text-dark-text">Edit Profile Page</h1>
        </HelmetProvider>
    );
}