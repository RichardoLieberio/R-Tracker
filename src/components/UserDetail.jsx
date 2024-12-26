import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';

import {
    getBgPrimaryColor, getBackgroundColor,
    getDisabledBgNeutralColor,
    getHoverBgNeutral50Color, getHoverBgHighlightColor,
    getTextColor, getTextNeutralColor, getOppositeTextColor, getTextErrorColor,
    getBorderNeutralColor,
    getShadowColor
} from '../css/color';

import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaUserCog, FaLock, FaHockeyPuck, FaUserAltSlash, FaUserCheck, FaTrashAlt} from 'react-icons/fa';
import {IoSettingsSharp, IoDocumentText} from 'react-icons/io5';
import ButtonSpinner from './ButtonSpinner';

export default function UserDetail(props) {
    const {blockToken, setBlacklistModal, setWhitelistModal, setDeleteAccountModal} = props;

    const theme = useSelector((state) => state.web.theme);
    const user = useSelector((state) => state.userPage.user);
    const processing = useSelector((state) => state.userPage.processing);

    return (
        <>
        <div className={`flex-1 min-h-[280px] h-fit sticky top-24 ${user ? 'flex flex-col gap-12' : `flex items-center justify-center gap-1 ${getTextNeutralColor(theme)} text-2xl`} whitespace-nowrap overflow-hidden`}>
            {
                user
                ? <>
                    <section className="flex flex-col gap-8">
                        <header className="flex items-center justify-between text-xl font-semibold">
                            Account Information
                            <Menu>
                                <MenuButton disabled={processing.includes(user?._id)} className={`w-fit py-1 px-8 relative text-base ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                                    {processing.includes(user?._id) && <ButtonSpinner />}
                                    <span className={`flex items-center gap-2 ${processing.includes(user?._id) ? 'opacity-0' : ''}`}><IoSettingsSharp /> Actions</span>
                                </MenuButton>
                                <MenuItems transition anchor="bottom end" className={`w-52 mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                    <MenuItem>
                                        <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                            <FaUserCog className="flex-shrink-0 text-lg" />
                                            Edit account
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
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
                                            user.blacklisted
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
                        </header>
                        <main className="flex flex-col gap-4">
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Name</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user.name}</span>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Email</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user.email}</span>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Role</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user.role}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                <div className="flex-1 relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Created At</span>
                                    <span className={`px-3 py-2 border ${getBorderNeutralColor(theme)} rounded-md`}>{format(new Date(user.created_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                </div>
                                {
                                    user.updated_at &&
                                    <div className="flex-1 relative flex flex-col">
                                        <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Updated At</span>
                                        <span className={`px-3 py-2 border ${getBorderNeutralColor(theme)} rounded-md`}>{format(new Date(user.updated_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                    </div>
                                }
                            </div>
                        </main>
                    </section>
                    {
                        user.blacklisted &&
                        <section className="flex flex-col gap-8">
                            <header className="flex items-center justify-between text-xl font-semibold">Blacklisted</header>
                            <main className="flex flex-col gap-4">
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Blacklisted By</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user.blacklisted_by.name}</span>
                                </div>
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Blacklisted At</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{format(new Date(user.blacklisted_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                </div>
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Reason</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{user.blacklist_reason || '-'}</span>
                                </div>
                            </main>
                        </section>
                    }
                </>
                : <>
                    <IoDocumentText /> No data
                </>
            }
        </div>
        </>
    );
}

UserDetail.propTypes = {
    blockToken: PropTypes.func,
    setBlacklistModal: PropTypes.func,
    setWhitelistModal: PropTypes.func,
    setDeleteAccountModal: PropTypes.func
}