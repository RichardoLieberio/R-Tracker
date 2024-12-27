import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import contr from '../controllers/expenseCategory';

import {
    getBackgroundColor, getBgPrimaryColor, getBgNeutralColor, getBgNeutral10Color, getBgErrorColor,
    getHoverBgHighlightColor,
    getDisabledBgNeutralColor,
    getTextColor, getTextPrimaryColor, getTextErrorColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getBorderPrimaryColor, getBorderTextColor
} from '../css/color';
import css from '../css/expenseCategory';

import {Modal, Box} from '@mui/material';
import {FaHashtag} from 'react-icons/fa';
import {RxCross2} from 'react-icons/rx';
import {MdErrorOutline} from 'react-icons/md';
import {FiUpload} from 'react-icons/fi';
import Tooltip from './Tooltip';
import ButtonSpinner from './ButtonSpinner';

export default function AddCategoryModal(props) {
    const {modal, setModal, name, setName, color, setColor, icon, setIcon, iconText, setIconText, error, processing, submit} = props;

    const theme = useSelector((state) => state.web.theme);

    const [nameLabelClass, setNameLabelClass] = useState(css(theme).labelMiddle);
    const [nameInputClass, setNameInputClass] = useState(css(theme).defaultInput);
    const [colorLabelClass, setColorLabelClass] = useState(css(theme).labelMiddle);
    const [colorInputClass, setColorInputClass] = useState(css(theme).colorInput);
    const [showHex, setShowHex] = useState(false);

    const imageRef = useRef(null);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        contr.inputErrorHandler(theme, error.name, name, setNameLabelClass, setNameInputClass);
        contr.inputErrorHandler(theme, error.color, color, setColorLabelClass, setColorInputClass, true);
    }, [error, modal, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        setShowHex(color ? true : false);
    }, [modal]); // eslint-disable-line react-hooks/exhaustive-deps

    function nameInputFocus() {
        if (error.name) setNameLabelClass(css(theme).labelTopError)
        else setNameLabelClass(css(theme).labelTopFocus);
    }

    function nameInputBlur() {
        if (error.name) setNameLabelClass(name ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setNameLabelClass(name ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function colorInputFocus() {
        setShowHex(true);
        if (error.color) setColorLabelClass(css(theme).labelTopError)
        else setColorLabelClass(css(theme).labelTopFocus);
    }

    function colorInputBlur() {
        setShowHex(color ? true : false);
        if (error.color) setColorLabelClass(color ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setColorLabelClass(color ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function chooseFile(e) {
        e.preventDefault();
        imageRef?.current?.click();
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                setIcon(reader.result);
                setIconText(file.name);
            }
        }
    }

    function dropHandler(e) {
        e.preventDefault();
        if (processing) return;

        const file = e.dataTransfer?.files[0] || null;

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                setIcon(reader.result);
                setIconText(file.name);
            }
        }
    }

    function removeFile() {
        if (processing) return;
        setIcon(null);
        setIconText('');
    }

    function enterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submit();
        }
    }

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Add Expense Category Modal" aria-describedby="Add new expense category">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Add Expense Category</h2>
                    <small className="text-sm">Fill out the fields below to create a new expense category with a name, color, and icon.</small>
                </header>
                <main>
                    <form onKeyDown={enterKeyDown} className="flex flex-col gap-8" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        <section className="flex flex-col gap-4">
                            <div className="relative">
                                {
                                    error.name
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.name} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="name" className={nameLabelClass}>Name</label>
                                <input type="text" id="name" value={name} disabled={processing} autoFocus onChange={(e) => setName(e.target.value)} onFocus={nameInputFocus} onBlur={nameInputBlur} className={nameInputClass} />
                            </div>
                            <div className="relative">
                                {
                                    error.color
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.color} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                {
                                    showHex &&
                                    <div className={`px-3 py-3 ${error.color ? 'ps-10' : ''} absolute left-0 bottom-0 rounded-tr-md rounded-br-md pointer-events-none`}><FaHashtag /></div>
                                }
                                <label htmlFor="color" className={colorLabelClass}>Hex Color</label>
                                <input type="text" id="color" value={color} disabled={processing} onChange={(e) => setColor(e.target.value)} onFocus={colorInputFocus} onBlur={colorInputBlur} className={colorInputClass} />
                            </div>
                        </section>
                        <section className="flex flex-col gap-6">
                            <div className="relative flex items-center">
                                <div className={`w-full h-[1px] ${getBgNeutralColor(theme)}`}></div>
                                <div className={`px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 ${getBackgroundColor(theme)}`}>
                                    {
                                        error.icon
                                        &&  <Tooltip title={error.icon} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                    }
                                    <h2 className={error.icon && getTextErrorColor(theme)}>{phoneBreakpoint ? 'Upload icon' : 'Upload'}</h2>
                                </div>
                            </div>
                            <div onDrop={dropHandler} onDragOver={e => e.preventDefault()} className={`h-52 relative ${getBgNeutral10Color(theme)} border border-dashed ${theme === 'dark' ? getBorderTextColor(theme) : getBorderPrimaryColor(theme)} rounded-lg`}>
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                                    {
                                        icon
                                        ? <>
                                            <div className="relative">
                                                <img src={icon} alt="Chosen icon" className="w-20 h-20 phone:w-28 phone:h-28 tablet:w-32 tablet:h-32" />
                                                <div onClick={removeFile} className={`w-6 h-6 absolute -top-3 -right-3 flex items-center justify-center rounded-full ${processing ? `${getBgNeutralColor(theme)} cursor-not-allowed` : `${getBgPrimaryColor(theme)} cursor-pointer ${getHoverBgHighlightColor(theme)}`}`}>
                                                    <RxCross2 className={getOppositeTextColor(theme)} />
                                                </div>
                                            </div>
                                            <div className="w-32 phone:w-40 tablet:w-44 desktop:w-full desktop:min-w-52 desktop:max-w-60 flex items-center justify-center">
                                                <span className="text-start text-ellipsis whitespace-nowrap overflow-hidden">{iconText.substring(0, iconText.lastIndexOf('.'))}</span>
                                                <span>{iconText.substring(iconText.lastIndexOf('.'))}</span>
                                            </div>
                                        </>
                                        : <>
                                            <FiUpload className={`text-4xl ${theme === 'dark' ? getOppositeTextColor(theme) : getTextPrimaryColor(theme)}`} />
                                            <div className="flex flex-col items-center">
                                                <small className="text-xs whitespace-nowrap">Max file size {process.env.MAX_FILE_SIZE_IN_MB}MB</small>
                                                <span className="text-sm whitespace-nowrap">Drag & drop your file or</span>
                                            </div>
                                            <input type="file" ref={imageRef} onChange={handleFileChange} className="hidden" />
                                            <button onClick={chooseFile} disabled={processing} className={`mx-auto py-1 px-4 relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>Choose file</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </section>
                    </form>
                </main>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                    <button onClick={submit} disabled={processing} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {processing && <ButtonSpinner />}
                        <span className={processing ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

AddCategoryModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    name: PropTypes.string,
    setName: PropTypes.func,
    color: PropTypes.string,
    setColor: PropTypes.func,
    icon: PropTypes.string,
    setIcon: PropTypes.func,
    iconText: PropTypes.string,
    setIconText: PropTypes.func,
    error: PropTypes.object,
    processing: PropTypes.bool,
    submit: PropTypes.func
};