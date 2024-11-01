import PropTypes from 'prop-types';

import OriginalTooltip from '@mui/material/Tooltip';

export default function Tooltip({title, children, className, ...props}) {
    return (
        <OriginalTooltip {...props} title={<span className={className}>{title}</span>} slotProps={{tooltip: {sx: {width: 'auto', margin: '0', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}}}>
            <span>{children}</span>
        </OriginalTooltip>
    );
}


Tooltip.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
};