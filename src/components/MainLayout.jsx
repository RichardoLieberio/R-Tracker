import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {getTextColor, getBackgroundColor} from '../css/color';

export default function MainLayout({noThemeRoutes, children}) {
    const location = useLocation();

    const theme = useSelector((state) => state.web.theme);

    return (
        <main className={`w-full min-w-60 min-h-screen relative text-base ${noThemeRoutes.includes(location.pathname) ? 'text-purple-text bg-purple-background' : `${getTextColor(theme)} ${getBackgroundColor(theme)}`}`}>
            {children}
        </main>
    );
}

MainLayout.propTypes = {
    noThemeRoutes: PropTypes.array,
    children: PropTypes.node
};