import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {
    getHoverBgNeutral50Color,
    getDisabledBgNeutralColor,
    getTextColor, getOppositeTextColor, getTextErrorColor,
    getHoverTextHighlightColor,
    getFromSecondaryColor, getToPrimaryColor,
    getShadowColor
} from '../css/color';

import {Link} from 'react-router-dom';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaUserCog, FaUser, FaPalette, FaSignOutAlt} from 'react-icons/fa';

export default function Header(props) {
    const {setThemeModal, isSigningOut, signout, pages} = props;

    const theme = useSelector((state) => state.web.theme);
    const page = useSelector((state) => state.web.page);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    return (
        <>
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
                <MenuItems transition anchor="bottom end" className={`w-52 mt-2 py-1 flex flex-col text-base ${getTextColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                    <MenuItem>
                        <Link to="/edit-profile" className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                            <FaUserCog className="flex-shrink-0 text-lg" />
                            Edit profile
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={() => setThemeModal(true)} className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                            <FaPalette className="flex-shrink-0 text-lg" />
                            Theme
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button disabled={isSigningOut} onClick={signout} className={`px-4 py-2 flex items-center gap-2 text-start ${getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                            <FaSignOutAlt className="flex-shrink-0 text-lg" />
                            Sign out
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </>
    );
}

Header.propTypes = {
    setThemeModal: PropTypes.func,
    isSigningOut: PropTypes.bool,
    signout: PropTypes.func,
    pages: PropTypes.object
};