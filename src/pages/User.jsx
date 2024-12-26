import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';
import {setSearch, addProcess, deleteProcess} from '../redux/userPageSlice';

import contr from '../controllers/user';

import {
    getBackgroundColor,
    getBorderNeutralColor,
    getFocusBorderPrimaryColor, getFocusBorderHighlightColor
} from '../css/color';

import {HelmetProvider} from 'react-helmet-async';
import UserHead from '../head/UserHead';
import UserTable from '../components/UserTable';
import UserDetail from '../components/UserDetail';
import UserModal from '../components/UserModal';
import ChangePwdModal from '../components/ChangePwdModal';
import BlacklistModal from '../components/BlacklistModal';
import WhitelistModal from '../components/WhitelistModal';
import ConfirmDeleteAccount from '../components/ConfirmDeleteAccount';

export default function User() {
    const [csrfToken, setCSRFToken] = useState('');
    const [passUsers, setPassUsers] = useState(null);
    const [userModal, setUserModal] = useState(false);

    const [changePwdModal, setChangePwdModal] = useState(false);
    const [pwd, setPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [pwdError, setPwdError] = useState({});

    const [blacklistModal, setBlacklistModal] = useState(false);
    const [blacklistReason, setBlacklistReason] = useState('');
    const [blacklistError, setBlacklistError] = useState({});

    const [whitelistModal, setWhitelistModal] = useState(false);

    const [deleteAccountModal, setDeleteAccountModal] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const users = useSelector((state) => state.data.users);
    const search = useSelector((state) => state.userPage.search);
    const user = useSelector((state) => state.userPage.user);
    const processing = useSelector((state) => state.userPage.processing);

    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    useEffect(function() {
        getToast();
        dispatch(changePage(location.pathname));

        getCSRFToken(setCSRFToken);
        !users && contr.getAllUsers(accessToken);

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        if (users) {
            if (search.length >= 3) setPassUsers(users.filter(({name, email}) => name.toLowerCase().includes(search.toLowerCase()) || email.toLowerCase().includes(search.toLowerCase())))
            else setPassUsers(users);
        }
    }, [users]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        setPwd('');
        setConfPwd('');
        setPwdError({});

        setBlacklistReason('');
        setBlacklistError({});

        if (!user) {
            setUserModal(false);
            setChangePwdModal(false);
            setBlacklistModal(false);
            setWhitelistModal(false);
            setDeleteAccountModal(false);
        }
    }, [user]);

    useEffect(function() {
        setUserModal(false);
        setChangePwdModal(false);
        setBlacklistModal(false);
        setWhitelistModal(false);
        setDeleteAccountModal(false);
    }, [desktopBreakpoint]);

    function searchHandler(e) {
        dispatch(setSearch(e.target.value));
        if (e.target.value.length >= 3) setPassUsers(users?.filter(({name, email}) => name.toLowerCase().includes(e.target.value.toLowerCase()) || email.toLowerCase().includes(e.target.value.toLowerCase())))
        else if (search.length >= 3) setPassUsers(users);
    }

    async function changePwd() {
        if (!processing.includes(user._id)) {
            dispatch(addProcess(user._id));
            await contr.changePwd(user._id, pwd, confPwd, csrfToken, accessToken, setChangePwdModal, setPwdError);
            dispatch(deleteProcess(user._id));
        }
    }

    async function blockToken() {
        if (!processing.includes(user._id)) {
            dispatch(addProcess(user._id));
            await contr.blockToken(user._id, csrfToken, accessToken);
            dispatch(deleteProcess(user._id));
        }
    }

    async function blacklistUser() {
        if (!processing.includes(user._id)) {
            dispatch(addProcess(user._id));
            setBlacklistError({});
            await contr.blacklistUser(user._id, blacklistReason, csrfToken, accessToken, setBlacklistModal, setBlacklistError);
            dispatch(deleteProcess(user._id));
        }
    }

    async function whitelistUser() {
        if (!processing.includes(user._id)) {
            dispatch(addProcess(user._id));
            await contr.whitelistUser(user._id, csrfToken, accessToken, setWhitelistModal);
            dispatch(deleteProcess(user._id));
        }
    }

    async function deleteAccount() {
        if (!processing.includes(user._id)) {
            dispatch(addProcess(user._id));
            await contr.deleteUserAccount(user._id, csrfToken, accessToken);
            dispatch(deleteProcess(user._id));
        }
    }

    return (
        <HelmetProvider>
            <UserHead />
            <section className="w-5/6 min-w-56 mx-auto py-8 pb-16 flex flex-col gap-8">
                <header className="flex items-center gap-2">
                    <label htmlFor="search">Search</label>
                    <input type="text" id="search" value={search} onChange={searchHandler} className={`w-full max-w-72 px-3 py-2 ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md outline-none ${theme === 'dark' ? getFocusBorderHighlightColor(theme) : getFocusBorderPrimaryColor(theme)}`} autoCapitalize="off" autoComplete="off" spellCheck="false" />
                </header>
                <main className="w-full desktop:flex desktop:gap-24">
                    {
                        passUsers && <UserTable users={passUsers} setUserModal={setUserModal} />
                    }
                    {
                        desktopBreakpoint
                        ? <UserDetail setChangePwdModal={setChangePwdModal} blockToken={blockToken} setBlacklistModal={setBlacklistModal} setWhitelistModal={setWhitelistModal} setDeleteAccountModal={setDeleteAccountModal} />
                        : <UserModal userModal={userModal} setUserModal={setUserModal} setChangePwdModal={setChangePwdModal} blockToken={blockToken} setBlacklistModal={setBlacklistModal} setWhitelistModal={setWhitelistModal} setDeleteAccountModal={setDeleteAccountModal} />
                    }
                    <ChangePwdModal changePwdModal={changePwdModal} setChangePwdModal={setChangePwdModal} pwd={pwd} setPwd={setPwd} confPwd={confPwd} setConfPwd={setConfPwd} pwdError={pwdError} changePwd={changePwd} />
                    <BlacklistModal blacklistModal={blacklistModal} setBlacklistModal={setBlacklistModal} blacklistReason={blacklistReason} setBlacklistReason={setBlacklistReason} blacklistError={blacklistError} blacklistUser={blacklistUser} />
                    <WhitelistModal whitelistModal={whitelistModal} setWhitelistModal={setWhitelistModal} whitelistUser={whitelistUser} />
                    <ConfirmDeleteAccount deleteAccountModal={deleteAccountModal} setDeleteAccountModal={setDeleteAccountModal} deleteAccount={deleteAccount} />
                </main>
            </section>
        </HelmetProvider>
    );
}