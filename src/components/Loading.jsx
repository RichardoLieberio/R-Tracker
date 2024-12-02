import PropTypes from 'prop-types';

import themeConfig from '../../config/theme';

import {HashLoader} from 'react-spinners';

export default function Loading(props) {
    const {size, theme} = props;

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <HashLoader size={size} color={themeConfig[theme].primary} />
        </div>
    );
}

Loading.propTypes = {
    size: PropTypes.number,
    theme: PropTypes.string
};