import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import themes from '../../config/theme';

import {getBgPrimaryColor, getBackgroundColor, getTextPrimaryColor, getTextColor, getOppositeTextColor, getHoverTextHighlightColor, getBorderPrimaryColor, getHoverBorderHighlightColor} from '../css/color';

import contr from '../controllers/themeModal';

import {Modal, Box} from '@mui/material';
import {FaCheck} from 'react-icons/fa6';

export default function ThemeModal(props) {
    const {themeModal, setThemeModal} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <Modal open={themeModal} onClose={() => setThemeModal(false)} aria-labelledby="Theme Modal" aria-describedby="Choose your theme">
            <Box className={`w-48 phone:w-72 h-auto p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-6 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="text-xl">Theme</header>
                <main className="flex flex-wrap gap-4">
                    {
                        Object.keys(themes).map(eachTheme =>
                            <div key={eachTheme} onClick={() => contr.changeTheme(eachTheme)} className={`w-8 h-8 flex items-center justify-center ${getOppositeTextColor(eachTheme)} ${getBgPrimaryColor(eachTheme)} rounded-full cursor-pointer`}>
                                {
                                    eachTheme === theme &&
                                    <FaCheck />
                                }
                            </div>
                        )
                    }
                </main>
                <footer className="text-end">
                    <button onClick={() => setThemeModal(false)} className={`py-1 px-8 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} border ${theme !== 'dark' ? getBorderPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>Close</button>
                </footer>
            </Box>
        </Modal>
    );
}

ThemeModal.propTypes = {
    themeModal: PropTypes.bool,
    setThemeModal: PropTypes.func
};