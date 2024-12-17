import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import contr from '../controllers/editProfile';

import {getBackgroundColor, getBgPrimaryColor, getBgErrorColor, getHoverBgHighlightColor, getDisabledBgHighlightColor, getTextColor, getTextPrimaryColor, getTextErrorColor, getOppositeTextColor, getHoverTextHighlightColor, getHoverBorderHighlightColor} from '../css/color';
import css from '../css/editProfile';

import {Modal, Box} from '@mui/material';
import Tooltip from './Tooltip';
import {MdErrorOutline} from 'react-icons/md';

export default function EditNameModal(props) {
    const {newName, setNewName, nameModal, setNameModal, savingNewName, nameError, saveName} = props;

    const theme = useSelector((state) => state.web.theme);

    const [labelClass, setLabelClass] = useState(newName ? css(theme).labelTopBlur : css(theme).labelMiddle);
    const [inputClass, setInputClass] = useState(nameError.name ? css(theme).defaultInput : css(theme).defaultInputError);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        nameError.name
        ? setLabelClass(newName ? css(theme).labelTopError : css(theme).labelMiddleError)
        : setLabelClass(newName ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }, [nameModal]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        contr.inputErrorHandler(theme, nameError.name, newName, setLabelClass, setInputClass);
    }, [nameError, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    function nameHandler(e) {
        setNewName(e.target.value);
    }

    function nameInputFocus() {
        if (nameError.name) setLabelClass(css(theme).labelTopError)
        else setLabelClass(css(theme).labelTopFocus);
    }

    function nameInputBlur() {
        if (nameError.name) setLabelClass(newName ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setLabelClass(newName ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function enterKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            saveName();
        }
    }

    return (
        <Modal open={nameModal} onClose={() => setNameModal(false)} aria-labelledby="Theme Modal" aria-describedby="Choose your theme">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Edit Name</h2>
                    <small className="text-sm">Update your name in the field below.</small>
                </header>
                <main>
                    <form onKeyDown={enterKeyDown} className="relative" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        {
                            nameError.name
                            &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                    <Tooltip title={nameError.name} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                        <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                    </Tooltip>
                                </div>
                        }
                        <label htmlFor="name" className={labelClass}>New Name</label>
                        <input type="text" id="name" value={newName} disabled={savingNewName} autoFocus onChange={nameHandler} onFocus={nameInputFocus} onBlur={nameInputBlur} className={inputClass} />
                    </form>
                </main>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setNameModal(false)} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>Close</button>
                    <button onClick={saveName} disabled={savingNewName} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgHighlightColor(theme)} disabled:cursor-not-allowed`}>Save</button>
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
    nameError: PropTypes.object,
    saveName: PropTypes.func
};