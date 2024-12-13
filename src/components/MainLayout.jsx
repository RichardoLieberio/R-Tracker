import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {getBackgroundColor} from '../css/color';

export default function MainLayout({children}) {
    const location = useLocation();

    const theme = useSelector((state) => state.web.theme);

    const noThemeRoutes = ['/login', '/register', '/forgot-password'];

    return (
        <main className={`w-full min-w-60 min-h-screen relative ${noThemeRoutes.includes(location.pathname) ? 'bg-purple-background' : getBackgroundColor(theme)}`}>
            {children}
        </main>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};