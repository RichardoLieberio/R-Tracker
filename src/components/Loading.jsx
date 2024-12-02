import PropTypes from 'prop-types';

import {HashLoader} from 'react-spinners';

export default function Loading(props) {
    const {size, color} = props;

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <HashLoader size={size} color={color} />
        </div>
    );
}

Loading.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string
};