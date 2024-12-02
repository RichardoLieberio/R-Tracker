import PropTypes from 'prop-types';

import {HashLoader} from 'react-spinners';

export default function Loading(props) {
    const {size, color} = props;

    return (
        <HashLoader size={size} color={color} />
    );
}

Loading.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string
};