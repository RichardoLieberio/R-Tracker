import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {getBgPrimaryColor, getOppositeTextColor} from '../css/color';

import contr from '../controllers/sharedLayout';

import Header from './Header';
import Drawer from './Drawer';
import ScrollTop from './ScrollTop';
import ThemeModal from './ThemeModal';
import {Link} from 'react-router-dom';
import {FaMoneyBill, FaChartPie, FaUsers, FaList} from 'react-icons/fa';
import {IoMenu} from 'react-icons/io5';

export default function SharedLayout() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [themeModal, setThemeModal] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const theme = useSelector(state => state.web.theme);

    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    useEffect(function() {
        tabletBreakpoint && setOpenDrawer(false);
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
        setOpenDrawer(value => !value);
    }

    async function signout() {
        if (!isSigningOut) {
            setIsSigningOut(true);
            await contr.signout();
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <header className={`w-full h-12 px-4 fixed flex items-center justify-between ${getBgPrimaryColor(theme)} z-[1]`}>
                <Link to="/">
                    <img src="/White Web Icon.png" alt="R Tracker Icon" loading="lazy" className="w-8" />
                </Link>
                {
                    tabletBreakpoint
                    ? <Header setThemeModal={setThemeModal} isSigningOut={isSigningOut} signout={signout} pages={pages} />
                    : <>
                        <button onClick={toggleDrawer} className={`text-2xl ${getOppositeTextColor(theme)}`}><IoMenu /></button>
                        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setThemeModal={setThemeModal} isSigningOut={isSigningOut} toggleDrawer={toggleDrawer} signout={signout} pages={pages} />
                    </>
                }
            </header>
            <section className="flex-1 relative pt-12">
                <Outlet />
            </section>
            <ScrollTop />
            <ThemeModal themeModal={themeModal} setThemeModal={setThemeModal} />
        </div>
    );
}