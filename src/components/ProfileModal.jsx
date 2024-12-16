import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {getBgPrimaryColor, getBackgroundColor, getTextColor, getOppositeTextColor, getHoverBgHighlightColor, getBorderNeutralColor} from '../css/color';

import {Modal, Box} from '@mui/material';
import {FaPencilAlt} from 'react-icons/fa';

export default function ProfileModal(props) {
    const {profileModal, setProfileModal} = props;

    const theme = useSelector((state) => state.web.theme);
    const userInfo = useSelector((state) => state.auth.userInfo);

    console.log(userInfo)

    return (
        <Modal open={profileModal} onClose={() => setProfileModal(false)} aria-labelledby="Profile Modal" aria-describedby="Edit your profile">
            <Box className={`w-48 phone:w-72 tablet:w-96 h-auto p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-6 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="text-xl">Profile</header>
                <main className="flex flex-col gap-4 text-base">
                    <div className="relative flex flex-col">
                        <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)} transition-transform cursor-text`}>Name</span>
                        <span className={`w-full px-3 py-2 pr-10 truncate ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md`}>{userInfo.name}</span>
                        <div className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer"><FaPencilAlt /></div>
                    </div>
                    <div className="relative flex flex-col">
                        <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)} transition-transform cursor-text`}>Email</span>
                        <span className={`w-full px-3 py-2 pr-10 truncate ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md`}>{userInfo.email}</span>
                        <div className="px-3 py-3 absolute right-0 top-0 rounded-tr-md rounded-br-md cursor-pointer"><FaPencilAlt /></div>
                    </div>
                    {/* {
                        Object.keys(themes).map(eachTheme =>
                            <div key={eachTheme} onClick={() => contr.changeTheme(eachTheme)} className={`w-8 h-8 flex items-center justify-center ${getOppositeTextColor(eachTheme)} ${getBgPrimaryColor(eachTheme)} rounded-full cursor-pointer`}>
                                {
                                    eachTheme === theme &&
                                    <FaCheck className="text-base" />
                                }
                            </div>
                        )
                    } */}
                </main>
                <footer className="text-end">
                    <button onClick={() => setProfileModal(false)} className={`py-1 px-8 text-base ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)}`}>Close</button>
                </footer>
            </Box>
        </Modal>
    );
}

ProfileModal.propTypes = {
    profileModal: PropTypes.bool,
    setProfileModal: PropTypes.func
};