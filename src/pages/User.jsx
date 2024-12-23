import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';

import contr from '../controllers/user';

import {
    getBackgroundColor,
    getBorderNeutralColor,
    getFocusBorderPrimaryColor, getFocusBorderHighlightColor
} from '../css/color';

import UserTable from '../components/UserTable';
import UserDetail from '../components/UserDetail';

export default function User() {
    const [search, setSearch] = useState('');
    const [passUsers, setPassUsers] = useState(null);
    const [userModal, setUserModal] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const users = useSelector((state) => state.data.users);

    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    useEffect(function() {
        getToast();

        dispatch(changePage(location.pathname));
        !users && contr.getAllUsers(accessToken);

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        if (users) setPassUsers(users);
    }, [users]);

    function searchHandler(e) {
        setSearch(e.target.value);
        if (e.target.value.length >= 3) setPassUsers(users?.filter(({name, email}) => name.toLowerCase().includes(e.target.value.toLowerCase()) || email.toLowerCase().includes(e.target.value.toLowerCase())))
        else if (search.length >= 3) setPassUsers(users);
    }

    return (
        <section className="w-5/6 min-w-56 mx-auto py-8 pb-16 flex flex-col gap-8">
            <header className="flex items-center gap-2">
                <label htmlFor="search">Search</label>
                <input type="text" id="search" value={search} onChange={searchHandler} className={`w-full max-w-72 px-3 py-2 ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md outline-none ${theme === 'dark' ? getFocusBorderHighlightColor(theme) : getFocusBorderPrimaryColor(theme)}`} autoCapitalize="off" autoComplete="off" spellCheck="false" />
            </header>
            <main className="w-full desktop:flex desktop:gap-24">
                {
                    passUsers && <UserTable users={passUsers} />
                }
                {
                    desktopBreakpoint && <UserDetail />
                }
            </main>
        </section>
    );
}