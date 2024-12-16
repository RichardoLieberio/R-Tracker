import PropTypes from 'prop-types';
import {useRef} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {getBackgroundColor, getBgPrimaryColor, getHoverBgHighlightColor, getTextColor, getTextPrimaryColor, getOppositeTextColor, getHoverTextHighlightColor, getHoverBorderHighlightColor} from '../css/color';
import css from '../css/editProfile';

import {Modal, Box} from '@mui/material';

export default function EditNameModal(props) {
    const {newName, setNewName, nameModal, setNameModal, savingNewName, nameError} = props;

    const labelRef = useRef(null);
    const inputRef = useRef(null);

    const theme = useSelector((state) => state.web.theme);

    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    function nameHandler(e) {
        setNewName(e.target.value);
    }

    function nameInputFocus() {
        if (nameError.name) labelRef.current.className = css(theme).labelTopError
        else labelRef.current.className = css(theme).labelTopFocus;
    }

    function nameInputBlur() {
        if (nameError.name) labelRef.current.className = newName ? css(theme).labelTopError : css(theme).labelMiddleError
        else labelRef.current.className = newName ? css(theme).labelTopBlur : css(theme).labelMiddle;
    }

    return (
        <Modal open={nameModal} onClose={() => setNameModal(false)} aria-labelledby="Theme Modal" aria-describedby="Choose your theme">
            <Box className={`w-48 phone:w-72 tablet:w-96 desktop:min-w-96 desktop:w-1/3 h-auto p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-6 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="text-xl">Edit Name</header>
                <main className="relative">
                    <label htmlFor="name" ref={labelRef} className={css(theme).labelMiddle}>New Name</label>
                    <input type="text" id="name" value={newName} ref={inputRef} disabled={savingNewName} onChange={nameHandler} onFocus={nameInputFocus} onBlur={nameInputBlur} className={css(theme).defaultInput} />
                </main>
                <footer className="flex items-center justify-end gap-4">
                    {
                        tabletBreakpoint &&
                        <button onClick={() => setNameModal(false)} className={`py-1 px-8 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>Close</button>
                    }
                    <button className={`py-1 px-8 ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)}`}>Save</button>
                </footer>
            </Box>
        </Modal>
    );
}

EditNameModal.propTypes = {
    newName: PropTypes.string,
    setNewName: PropTypes.func,
    nameModal: PropTypes.bool,
    setNameModal: PropTypes.func,
    savingNewName: PropTypes.bool,
    nameError: PropTypes.object
};