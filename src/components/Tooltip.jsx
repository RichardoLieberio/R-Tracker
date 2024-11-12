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

    if (typeof(title) === 'object') {
        let newTitle = '';
        const keys = Object.keys(title);

        keys.forEach(function(key, index) {
            newTitle += (index + 1 === keys.length) ? title[key] : `${title[key]}<br><br>`;
        });
        title = newTitle;
    }

    return (
        <OriginalTooltip enterTouchDelay={0} {...props} title={<span className={className} dangerouslySetInnerHTML={{__html: title}}></span>} slotProps={slotProps}>
            <span>{children}</span>
        </OriginalTooltip>
    );
}


Tooltip.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    children: PropTypes.node,
    className: PropTypes.string,
    posX: PropTypes.number,
    posY: PropTypes.number
};