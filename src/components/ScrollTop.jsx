import {useSelector} from 'react-redux';

import {getBgPrimaryColor, getHoverBgHighlightColor, getOppositeTextColor} from '../css/color';

import {useScrollTrigger, Fade, Box, Fab} from '@mui/material';
import {IoIosArrowUp} from 'react-icons/io';

export default function ScrollTop() {
    const theme = useSelector((state) => state.theme.color);

    function handleClick(e) {
        const anchor = (e.target.ownerDocument || document).querySelector('#top');
        anchor.scrollIntoView({block: 'center'});
    }

    return (
        <Fade in={useScrollTrigger({disableHysteresis: true, threshold: 100})}>
            <Box onClick={handleClick} role="presentation" className="fixed bottom-4 right-4">
                <Fab size="small" className={`${getBgPrimaryColor(theme)} ${getHoverBgHighlightColor(theme)} !shadow-none`}>
                    <IoIosArrowUp className={`${getOppositeTextColor(theme)}`} />
                </Fab>
            </Box>
        </Fade>
    );
}