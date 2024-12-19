import PropTypes from 'prop-types';
import {useMediaQuery} from '@mui/material';

import themeConfig from '../../config/theme';
import breakpoints from '../../config/breakpoints';

import {HashLoader} from 'react-spinners';

export default function Loading(props) {
    const {defaultSize, size, theme} = props;

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);
    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    const loadSize = defaultSize
    ? desktopBreakpoint ? 80
    : tabletBreakpoint ? 70
    : phoneBreakpoint ? 60
    : 50
    : size;

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <HashLoader size={loadSize} color={theme === 'dark' ? themeConfig[theme].text : themeConfig[theme].primary} />
        </div>
    );
}

Loading.propTypes = {
    defaultSize: PropTypes.bool,
    size: PropTypes.number,
    theme: PropTypes.string
};