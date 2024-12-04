import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {getBgPrimaryColor, getTextColor, getOppositeTextColor, getHoverBgSecondaryColor, getHoverBgNeutral50Color, getHoverTextHighlightColor, getFromSecondaryColor, getToPrimaryColor} from '../css/color';

import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaUser} from 'react-icons/fa';

export default function Header() {
    const theme = useSelector((state) => state.web.theme);
    const page = useSelector((state) => state.web.page);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    // const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    // const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);
    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    const pages = {
        '/': 'Expenses',
        '/charts': 'Charts',
        '/admin/user': 'Users',
        '/admin/expense-category': 'Categories'
    };

    return (
        <header className={`w-full h-12 px-4 fixed flex items-center justify-between ${getBgPrimaryColor(theme)} z-[1]`}>
            <Link to="/">
                <img src="/White Web Icon.png" alt="R Tracker Icon" loading="lazy" className="w-8" />
            </Link>
            <ul className={`w-fit h-full absolute left-1/2 -translate-x-1/2 flex list-none text-base ${getOppositeTextColor(theme)}`}>
                {
                    Object.keys(pages).filter(path => isAdmin || !path.startsWith('/admin/')).map(path =>
                        <li key={path}>
                            <Link to={path} className={`h-full px-6 flex items-center cursor-pointer ${page === path ? `bg-gradient-to-t ${getFromSecondaryColor(theme)} ${getToPrimaryColor(theme)}` : ''} ${getHoverTextHighlightColor(theme)}`}>
                                {pages[path]}
                            </Link>
                        </li>
                    )
                }
            </ul>
            <Menu>
                <MenuButton className={`${desktopBreakpoint ? 'max-w-40' : 'max-w-32'} h-full px-4 flex items-center gap-2 text-base cursor-pointer ${getOppositeTextColor(theme)} ${getHoverBgSecondaryColor(theme)}`}>
                    <FaUser className="flex-shrink-0" />
                    <span className="truncate">{userInfo.name.split(' ')[0]}</span>
                </MenuButton>
                <MenuItems transition anchor="bottom end" className={`w-52 mt-2 py-1 flex flex-col ${getTextColor(theme)} shadow-2xl rounded-md origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                    <MenuItem>
                        <button className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>Edit profile</button>
                    </MenuItem>
                    <MenuItem>
                        <button className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>Theme</button>
                    </MenuItem>
                    <hr className="border-red-700" />
                    <MenuItem>
                        <button className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>Sign out</button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </header>
    );
}