import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {
    getBgPrimaryColor, getBgHighlightColor,
    getHoverBgNeutral50Color,
    getTextColor, getOppositeTextColor, getTextErrorColor,
    getHoverTextHighlightColor,
    getFromSecondaryColor, getToPrimaryColor,
    getShadowColor,
    getBackgroundColor
} from '../css/color';

import Drawer from '@mui/material/Drawer';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaUser, FaUserCircle, FaRegUser} from 'react-icons/fa';
import {GrMoney, GrPieChart, GrList} from 'react-icons/gr';
import {IoIosSettings, IoIosColorPalette, IoMdExit} from 'react-icons/io';
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
            icon: <GrMoney />
        },
        '/charts': {
            text: 'Charts',
            icon: <GrPieChart />
        },
        '/admin/user': {
            text: 'Users',
            icon: <FaRegUser />
        },
        '/admin/expense-category': {
            text: 'Categories',
            icon: <GrList />
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
                                    <IoIosSettings className="flex-shrink-0 text-xl" />
                                    Edit profile
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                    <IoIosColorPalette className="flex-shrink-0 text-xl" />
                                    Theme
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button className={`px-4 py-2 flex items-center gap-2 text-start ${getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)}`}>
                                    <IoMdExit className="flex-shrink-0 text-xl" />
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
                        </section>
                    </Drawer>
                </>
            }
        </header>
    );
}