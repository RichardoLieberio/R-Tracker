import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import themes from '../../config/theme';

import {BeatLoader} from 'react-spinners';

export default function ButtonSpinner({noTheme, ...props}) {
    const theme = useSelector((state) => state.web.theme);

    return (
        <BeatLoader color={themes[noTheme ? 'purple' : theme].oppositeText} size={6} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" {...props} />
    );
}

ButtonSpinner.propTypes = {
    noTheme: PropTypes.bool
};