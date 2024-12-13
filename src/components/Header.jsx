import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {
    getBgPrimaryColor, getBgHighlightColor, getBackgroundColor,
    getHoverBgErrorColor, getHoverBgNeutral50Color,
    getTextColor, getOppositeTextColor, getTextErrorColor,
    getHoverOppositeTextColor, getHoverTextHighlightColor,
    getFromSecondaryColor, getToPrimaryColor,
    getBorderErrorColor, getBorderText20Color,
    getShadowColor
} from '../css/color';

import Drawer from '@mui/material/Drawer';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaUserCog, FaUser, FaUserCircle, FaPalette, FaSignOutAlt, FaMoneyBill, FaChartPie, FaUsers, FaList} from 'react-icons/fa';
import {IoMenu} from 'react-icons/io5';

export default function Header() {
    const [open, setOpen] = useState(false);

    const theme = useSelector((state) => state.web.theme);
    const page = useSelector((state) => state.web.page);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);
    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    useEffect(function() {
        tabletBreakpoint && setOpen(false);
    }, [tabletBreakpoint]);

    const pages = {
        '/': {
            text: 'Expenses',
            icon: <FaMoneyBill className="text-lg" />
        },
        '/charts': {
            text: 'Charts',
            icon: <FaChartPie className="text-lg" />
        },
        '/admin/user': {
            text: 'Users',
            icon: <FaUsers className="text-lg" />
        },
        '/admin/expense-category': {
            text: 'Categories',
            icon: <FaList className="text-lg" />
        }
    };

    function toggleDrawer() {
        setOpen(value => !value);
    }

    function drawerChangePage(path) {
        if (page !== path) {
            setOpen(value => !value);
        }
    }

    return (
        <header className={`w-full h-12 px-4 fixed flex items-center justify-between ${getBgPrimaryColor(theme)} z-[1]`}>
            <Link to="/">
                <img src="/White Web Icon.png" alt="R Tracker Icon" loading="lazy" className="w-8" />
            </Link>
            {
                tabletBreakpoint
                ? <>
                    <ul className={`w-fit h-full absolute left-1/2 -translate-x-1/2 flex list-none text-base ${getOppositeTextColor(theme)}`}>
                        {
                            Object.keys(pages).filter(path => isAdmin || !path.startsWith('/admin/')).map(path =>
                                <li key={path}>
                                    <Link to={path} className={`h-full px-6 flex items-center cursor-pointer ${page === path ? `bg-gradient-to-t ${getFromSecondaryColor(theme)} ${getToPrimaryColor(theme)}` : ''} ${getHoverTextHighlightColor(theme)}`}>
                                        {pages[path].text}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                    <Menu>
                        <MenuButton className={`${desktopBreakpoint ? 'max-w-40' : 'max-w-32'} h-full px-4 flex items-center gap-2 text-base cursor-pointer ${getOppositeTextColor(theme)} ${getHoverTextHighlightColor(theme)}`}>
                            <FaUser className="flex-shrink-0" />
                            <span className="truncate">{userInfo.name.split(' ')[0]}</span>
                        </MenuButton>
                        <MenuItems transition anchor="bottom end" className={`w-52 mt-2 py-1 flex flex-col text-base ${getTextColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-md origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                            <MenuItem>
                                <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                    <FaUserCog className="flex-shrink-0 text-lg" />
                                    Edit profile
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                    <FaPalette className="flex-shrink-0 text-lg" />
                                    Theme
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button className={`px-4 py-2 flex items-center gap-2 text-start ${getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)}`}>
                                    <FaSignOutAlt className="flex-shrink-0 text-lg" />
                                    Sign out
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </>
                : <>
                    <button onClick={toggleDrawer} className={`text-2xl ${getOppositeTextColor(theme)}`}><IoMenu /></button>
                    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                        <section className={`w-56 phone:w-64 h-full flex flex-col ${getBackgroundColor(theme)} ${getOppositeTextColor(theme)}`}>
                            <section className={`px-4 py-6 flex items-center gap-2 ${getBgPrimaryColor(theme)}`}>
                                <FaUserCircle className="flex-shrink-0 text-4xl" />
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    <span className="text-base truncate">{userInfo.name}</span>
                                    <span className="text-sm truncate">{userInfo.email}</span>
                                </div>
                            </section>
                            <section className="py-6">
                                <ul className="list-none text-base">
                                    {
                                        Object.keys(pages).filter(path => isAdmin || !path.startsWith('/admin/')).map(path =>
                                            <li key={path}>
                                                <Link to={path} onClick={() => drawerChangePage(path)} className={`h-full px-4 py-2 flex items-center gap-2 cursor-pointer ${getTextColor(theme)} ${page === path ? `${getBgHighlightColor(theme)}` : `${getHoverTextHighlightColor(theme)}`}`}>
                                                    {pages[path].icon}
                                                    {pages[path].text}
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </section>
                            <section className="px-4">
                                <hr className={`${getBorderText20Color(theme)}`} />
                            </section>
                            <section className="py-6">
                                <ul className={`list-none text-base ${getTextColor(theme)}`}>
                                    <li className={`px-4 py-2 flex items-center gap-2 text-start ${getTextColor(theme)} ${getHoverTextHighlightColor(theme)} cursor-pointer`}>
                                        <FaUserCog className="flex-shrink-0 text-lg" />
                                        Edit profile
                                    </li>
                                    <li className={`px-4 py-2 flex items-center gap-2 text-start ${getTextColor(theme)} ${getHoverTextHighlightColor(theme)} cursor-pointer`}>
                                        <FaPalette className="flex-shrink-0 text-lg" />
                                        Theme
                                    </li>
                                </ul>
                            </section>
                            <button className={`mt-auto mb-6 mx-4 py-1 text-base ${getTextErrorColor(theme)} border ${getBorderErrorColor(theme)} ${getHoverOppositeTextColor(theme)} ${getHoverBgErrorColor(theme)} rounded-md`}>Sign out</button>
                        </section>
                    </Drawer>
                </>
            }
        </header>
    );
}