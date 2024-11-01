import PropTypes from 'prop-types';

import OriginalTooltip from '@mui/material/Tooltip';

export default function Tooltip({title, children, className, posX, posY, ...props}) {
    const slotProps = {
        tooltip: {
            sx: {
                width: 'auto',
                margin: '0',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'transparent',
                pointerEvents: 'none'
            }
        },
        popper: {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [posX, posY]
                    }
                }
            ]
        }
    };

    return (
        <OriginalTooltip enterTouchDelay={0} {...props} title={<span className={className}>{title}</span>} slotProps={slotProps}>
            <span>{children}</span>
        </OriginalTooltip>
    );
}


Tooltip.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    posX: PropTypes.number,
    posY: PropTypes.number
};