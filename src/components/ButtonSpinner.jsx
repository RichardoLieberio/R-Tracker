import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import themes from '../../config/theme';
import breakpoints from '../../config/breakpoints';

import {BeatLoader} from 'react-spinners';

export default function ButtonSpinner({noTheme, ...props}) {
    const theme = useSelector((state) => state.web.theme);

    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    return (
        <BeatLoader color={themes[noTheme ? 'purple' : theme].oppositeText} size={tabletBreakpoint ? 8 : 6} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" {...props} />
    );
}

ButtonSpinner.propTypes = {
    noTheme: PropTypes.bool
};