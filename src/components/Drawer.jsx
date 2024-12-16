import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {
    getBgPrimaryColor, getBgHighlightColor, getBackgroundColor,
    getHoverBgErrorColor,
    getDisabledBgError60Color,
    getTextColor, getOppositeTextColor, getTextErrorColor,
    getHoverOppositeTextColor, getHoverTextHighlightColor,
    getDisabledOppositeTextColor,
    getBorderErrorColor, getBorderText20Color
} from '../css/color';

import {Link} from 'react-router-dom';
import {Drawer as MuiDrawer} from '@mui/material';
import {FaUserCog, FaUserCircle, FaPalette} from 'react-icons/fa';

export default function Drawer(props) {
    const {openDrawer, setOpenDrawer, setThemeModal, isSigningOut, signout, pages} = props;

    const theme = useSelector((state) => state.web.theme);
    const page = useSelector((state) => state.web.page);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    function toggleModal(toggle) {
        setOpenDrawer(false);
        toggle(true);
    }

    return (
        <MuiDrawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <section className={`w-56 phone:w-64 h-full flex flex-col ${getBackgroundColor(theme)} ${getOppositeTextColor(theme)}`}>
                <section className={`px-4 py-6 flex items-center gap-2 ${getBgPrimaryColor(theme)}`}>
                    <FaUserCircle className="flex-shrink-0 text-4xl" />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <span className="truncate">{userInfo.name}</span>
                        <span className="text-sm truncate">{userInfo.email}</span>
                    </div>
                </section>
                <section className="py-6">
                    <ul className="list-none">
                        {
                            Object.keys(pages).filter(path => isAdmin || !path.startsWith('/admin/')).map(path =>
                                <li key={path}>
                                    <Link to={path} onClick={() => path !== page && setOpenDrawer(false)} className={`h-full px-4 py-2 flex items-center gap-2 cursor-pointer ${getTextColor(theme)} ${page === path ? `${getBgHighlightColor(theme)}` : `${getHoverTextHighlightColor(theme)}`}`}>
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
                    <ul className={`list-none ${getTextColor(theme)}`}>
                        <li>
                            <Link to="/edit-profile" onClick={() => page !== '/edit-profile' && setOpenDrawer(false)} className={`px-4 py-2 flex items-center gap-2 text-start ${getTextColor(theme)} ${page === '/edit-profile' ? `${getBgHighlightColor(theme)}` : `${getHoverTextHighlightColor(theme)}`} cursor-pointer`}>
                                <FaUserCog className="flex-shrink-0 text-lg" />
                                Edit profile
                            </Link>
                        </li>
                        <li>
                            <span onClick={() => toggleModal(setThemeModal)} className={`px-4 py-2 flex items-center gap-2 text-start ${getTextColor(theme)} ${getHoverTextHighlightColor(theme)} cursor-pointer`}>
                                <FaPalette className="flex-shrink-0 text-lg" />
                                Theme
                            </span>
                        </li>
                    </ul>
                </section>
                <button disabled={isSigningOut} onClick={signout} className={`mt-auto mb-6 mx-4 py-1 ${getTextErrorColor(theme)} ${isSigningOut ? '' : `border ${getBorderErrorColor(theme)}`} rounded-md ${getHoverOppositeTextColor(theme)} ${getHoverBgErrorColor(theme)} ${getDisabledOppositeTextColor(theme)} ${getDisabledBgError60Color(theme)} disabled:cursor-not-allowed`}>Sign out</button>
            </section>
        </MuiDrawer>
    );
}

Drawer.propTypes = {
    openDrawer: PropTypes.bool,
    setOpenDrawer: PropTypes.func,
    setThemeModal: PropTypes.func,
    isSigningOut: PropTypes.bool,
    signout: PropTypes.func,
    pages: PropTypes.object
};