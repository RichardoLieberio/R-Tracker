import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';
import {format} from 'date-fns';

import breakpoints from '../../config/breakpoints';

import {
    getBgPrimaryColor, getBackgroundColor,
    getDisabledBgNeutralColor,
    getHoverBgNeutral50Color, getHoverBgHighlightColor,
    getTextPrimaryColor, getTextColor, getOppositeTextColor, getTextErrorColor,
    getHoverTextHighlightColor,
    getBorderNeutralColor,
    getShadowColor,
    getScrollbarTrackBackground,
    getScrollbarThumbText
} from '../css/color';

import {Modal, Box} from '@mui/material';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaUserCog, FaLock, FaHockeyPuck, FaUserAltSlash, FaUserCheck, FaTrashAlt} from 'react-icons/fa';
import {IoSettingsSharp} from 'react-icons/io5';
import ButtonSpinner from './ButtonSpinner';

export default function UserModal(props) {
    const {userModal, setUserModal, setChangePwdModal, blockToken, setBlacklistModal, setWhitelistModal, setDeleteAccountModal} = props;

    const theme = useSelector((state) => state.web.theme);
    const user = useSelector((state) => state.userPage.user);
    const processing = useSelector((state) => state.userPage.processing);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    return (
        <Modal open={userModal} onClose={() => setUserModal(false)} aria-labelledby="User Modal" aria-describedby="User account information">
            <Box className={`w-1/2 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto py-7 phone:py-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <main className={`max-h-96 px-7 phone:px-8 flex flex-col gap-8 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                    <section className="flex flex-col gap-8">
                        <header className="flex items-center justify-between text-xl font-semibold">Account Information</header>
                        <main className="flex flex-col gap-4">
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Name</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user ? user.name : '-'}</span>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Email</span>
                                <span className={`px-3 py-2 border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user ? user.email : '-'}</span>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Role</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user ? user.role : '-'}</span>
                            </div>
                            <div className="flex-1 relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Created At</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user ? format(new Date(user.created_at), 'MMMM dd, yyyy HH:mm:ss') : '-'}</span>
                            </div>
                            {
                                user?.updated_at &&
                                <div className="flex-1 relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Updated At</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{format(new Date(user.updated_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                </div>
                            }
                        </main>
                    </section>
                    {
                        user?.blacklisted &&
                        <section className="flex flex-col gap-8">
                            <header className="flex items-center justify-between text-xl font-semibold">Blacklisted</header>
                            <main className="flex flex-col gap-4">
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Blacklisted By</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user.blacklisted_by.name}</span>
                                </div>
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Blacklisted At</span>
                                    <span className={`px-3 py-2 border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{format(new Date(user.blacklisted_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                </div>
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Reason</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user.blacklist_reason || '-'}</span>
                                </div>
                            </main>
                        </section>
                    }
                </main>
                <footer className="px-7 phone:px-8 flex items-center justify-end gap-4">
                    <button onClick={() => setUserModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                    <Menu>
                        <MenuButton disabled={processing.includes(user?._id)} className={`w-fit py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                            {processing.includes(user?._id) && <ButtonSpinner />}
                            <span className={`flex items-center gap-2 ${processing.includes(user?._id) ? 'opacity-0' : ''}`}>
                                {phoneBreakpoint && <IoSettingsSharp />}
                                Actions
                            </span>
                        </MenuButton>
                        <MenuItems transition anchor="top end" className={`${phoneBreakpoint ? 'w-52' : 'w-48'} mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg z-[9999] origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                            <MenuItem>
                                <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                    <FaUserCog className="flex-shrink-0 text-lg" />
                                    Edit account
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => setChangePwdModal(true)} className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                    <FaLock className="flex-shrink-0 text-lg" />
                                    Change password
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={blockToken} className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                    <FaHockeyPuck className="flex-shrink-0 text-lg" />
                                    Block token
                                </button>
                            </MenuItem>
                            <MenuItem>
                                {
                                    user?.blacklisted
                                    ?   <button onClick={() => setWhitelistModal(true)} className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                            <FaUserCheck className="flex-shrink-0 text-lg" />
                                            Whitelist
                                        </button>
                                    :   <button onClick={() => setBlacklistModal(true)} className={`px-4 py-2 flex items-center gap-2 text-start ${getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)}`}>
                                            <FaUserAltSlash className="flex-shrink-0 text-lg" />
                                            Blacklist
                                        </button>
                                }
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => setDeleteAccountModal(true)} className={`px-4 py-2 flex items-center gap-2 text-start ${getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)}`}>
                                    <FaTrashAlt className="flex-shrink-0 text-lg" />
                                    Delete account
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </footer>
            </Box>
        </Modal>
    );
}

UserModal.propTypes = {
    userModal: PropTypes.bool,
    setUserModal: PropTypes.func,
    setChangePwdModal: PropTypes.func,
    blockToken: PropTypes.func,
    setBlacklistModal: PropTypes.func,
    setWhitelistModal: PropTypes.func,
    setDeleteAccountModal: PropTypes.func
};