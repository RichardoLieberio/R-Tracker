import {useSelector} from 'react-redux';
import {format} from 'date-fns';

import {
    getBgPrimaryColor, getBackgroundColor,
    getHoverBgNeutral50Color, getHoverBgHighlightColor,
    getTextColor, getTextNeutralColor, getOppositeTextColor, getTextErrorColor,
    getBorderNeutralColor,
    getShadowColor
} from '../css/color';

import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaUserCog, FaLock, FaHockeyPuck, FaUserAltSlash} from 'react-icons/fa';
import {IoSettingsSharp, IoDocumentText} from 'react-icons/io5';

export default function UserDetail() {
    const theme = useSelector((state) => state.web.theme);
    const user = useSelector((state) => state.userPage.user);

    return (
        <>
        <div className={`flex-1 h-fit sticky top-24 ${user ? 'flex flex-col gap-12' : `flex items-center justify-center gap-1 ${getTextNeutralColor(theme)} text-2xl opacity-0`} whitespace-nowrap overflow-hidden`}>
            {
                user
                ? <>
                    <section className="flex flex-col gap-8">
                        <header className="flex items-center justify-between text-xl font-semibold">
                            Account Information
                            <Menu>
                                <MenuButton className={`w-fit py-1 px-8 flex items-center gap-2 text-base ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)}`}>
                                    <IoSettingsSharp /> Actions
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
                                        <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                            <FaHockeyPuck className="flex-shrink-0 text-lg" />
                                            Block token
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button className={`px-4 py-2 flex items-center gap-2 text-start ${getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)}`}>
                                            <FaUserAltSlash className="flex-shrink-0 text-lg" />
                                            Blacklist
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </header>
                        <main className="flex flex-col gap-4">
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Name</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md`}>{user.name}</span>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Email</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md`}>{user.email}</span>
                            </div>
                            <div className="relative flex flex-col">
                                <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Role</span>
                                <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md`}>{user.role}</span>
                            </div>
                            <div className="flex gap-8">
                                <div className="flex-1 relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Created At</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md`}>{format(new Date(user.created_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                </div>
                                {
                                    user.updated_at &&
                                    <div className="flex-1 relative flex flex-col">
                                        <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Updated At</span>
                                        <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md`}>{format(new Date(user.updated_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                    </div>
                                }
                            </div>
                        </main>
                    </section>
                </>
                : <>
                    <IoDocumentText /> No data
                </>
            }
        </div>
        </>
    );
}