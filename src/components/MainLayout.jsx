import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {getTextColor, getBackgroundColor} from '../css/color';

export default function MainLayout({children}) {
    const theme = useSelector((state) => state.web.theme);

    return (
        <main className={`w-full min-w-60 min-h-screen relative text-base ${getTextColor(theme)} ${getBackgroundColor(theme)}`}>
            {children}
        </main>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};