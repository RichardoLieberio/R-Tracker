import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import contr from '../controllers/user';

import {
    getBackgroundColor, getBgPrimaryColor, getBgErrorColor,
    getHoverBgHighlightColor, getHoverBgNeutral50Color,
    getDisabledBgNeutralColor,
    getTextColor, getTextPrimaryColor, getTextErrorColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getShadowColor
} from '../css/color';
import css from '../css/user';

import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {Modal, Box} from '@mui/material';
import {MdErrorOutline} from 'react-icons/md';
import Tooltip from './Tooltip';
import ButtonSpinner from './ButtonSpinner';

export default function EditAccountModal(props) {
    const {editAccountModal, setEditAccountModal, name, setName, email, setEmail, role, setRole, roleOption, accountError, editAccount} = props;

    const theme = useSelector((state) => state.web.theme);
    const user = useSelector((state) => state.userPage.user);
    const processing = useSelector((state) => state.userPage.processing);

    const [nameLabelClass, setNameLabelClass] = useState(css(theme).labelTopBlur);
    const [nameInputClass, setNameInputClass] = useState(css(theme).defaultInput);
    const [emailLabelClass, setEmailLabelClass] = useState(css(theme).labelTopBlur);
    const [emailInputClass, setEmailInputClass] = useState(css(theme).defaultInput);
    const [roleLabelClass, setRoleLabelClass] = useState(css(theme).labelTopBlur);
    const [roleInputClass, setRoleInputClass] = useState(css(theme).defaultInput);
    const [roleWidth, setRoleWidth] = useState('auto');

    const roleButtonRef = useRef(null);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        contr.inputErrorHandler(theme, accountError.name, name, setNameLabelClass, setNameInputClass);
        contr.inputErrorHandler(theme, accountError.email, email, setEmailLabelClass, setEmailInputClass);
        contr.inputErrorHandler(theme, accountError.role, role, setRoleLabelClass, setRoleInputClass);
    }, [editAccountModal, accountError, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        function updateRoleWidth() {
            roleButtonRef.current && setRoleWidth(`${roleButtonRef.current.offsetWidth}px`);
        };

        updateRoleWidth();
        window.addEventListener('resize', updateRoleWidth);

        return function() {
            window.removeEventListener('resize', updateRoleWidth);
        }
    }, [roleButtonRef?.current, roleButtonRef?.current?.offsetWidth]); // eslint-disable-line react-hooks/exhaustive-deps

    function nameInputFocus() {
        if (accountError.name) setNameLabelClass(css(theme).labelTopError)
        else setNameLabelClass(css(theme).labelTopFocus);
    }

    function nameInputBlur() {
        if (accountError.name) setNameLabelClass(name ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setNameLabelClass(name ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function emailInputFocus() {
        if (accountError.email) setEmailLabelClass(css(theme).labelTopError)
        else setEmailLabelClass(css(theme).labelTopFocus);
    }

    function emailInputBlur() {
        if (accountError.email) setEmailLabelClass(email ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setEmailLabelClass(email ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function roleInputFocus() {
        if (accountError.role) setRoleLabelClass(css(theme).labelTopError)
        else setRoleLabelClass(css(theme).labelTopFocus);
    }

    function roleInputBlur() {
        if (accountError.role) setRoleLabelClass(role ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setRoleLabelClass(role ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function enterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            editAccount();
        }
    }

    return (
        <Modal open={editAccountModal} onClose={() => setEditAccountModal(false)} aria-labelledby="Edit Account Modal" aria-describedby="Edit user account">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Edit User Account</h2>
                    <small className="text-sm">Update the user&apos;s account details below. Ensure all fields are filled correctly before saving changes.</small>
                </header>
                <main>
                    <form onKeyDown={enterKeyDown} className="flex flex-col gap-4" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        <div className="relative">
                            {
                                accountError.name
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={accountError.name} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                            <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="name" className={nameLabelClass}>Name</label>
                            <input type="text" id="name" value={name} disabled={processing.includes(user?._id)} onChange={(e) => setName(e.target.value)} onFocus={nameInputFocus} onBlur={nameInputBlur} className={nameInputClass} />
                        </div>
                        <div className="relative">
                            {
                                accountError.email
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={accountError.email} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                            <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="email" className={emailLabelClass}>Email</label>
                            <input type="email" id="email" value={email} disabled={processing.includes(user?._id)} onChange={(e) => setEmail(e.target.value)} onFocus={emailInputFocus} onBlur={emailInputBlur} className={emailInputClass} />
                        </div>
                        <div className="relative">
                            {
                                accountError.role
                                &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                        <Tooltip title={accountError.role} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                            <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                        </Tooltip>
                                    </div>
                            }
                            <label htmlFor="role" className={roleLabelClass}>Role</label>
                            <Menu>
                                <MenuButton id="role" ref={roleButtonRef} disabled={processing.includes(user?._id)} onFocus={roleInputFocus} onBlur={roleInputBlur} className={`text-start ${roleInputClass}`}>
                                    {role}
                                </MenuButton>
                                <MenuItems transition anchor="bottom start" style={{width: roleWidth}} className={`py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg z-[99999] origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                    {
                                        roleOption.map(role => (
                                            <MenuItem key={role}>
                                                <button onClick={() => setRole(role)} className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                                    {role}
                                                </button>
                                            </MenuItem>
                                        ))
                                    }
                                </MenuItems>
                            </Menu>
                        </div>
                    </form>
                </main>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setEditAccountModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                    <button onClick={editAccount} disabled={processing.includes(user?._id)} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {processing.includes(user?._id) && <ButtonSpinner />}
                        <span className={processing.includes(user?._id) ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

EditAccountModal.propTypes = {
    editAccountModal: PropTypes.bool,
    setEditAccountModal: PropTypes.func,
    name: PropTypes.string,
    setName: PropTypes.func,
    email: PropTypes.string,
    setEmail: PropTypes.func,
    role: PropTypes.string,
    setRole: PropTypes.func,
    roleOption: PropTypes.array,
    accountError: PropTypes.object,
    editAccount: PropTypes.func
};