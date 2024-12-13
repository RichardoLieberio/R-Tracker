import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {getBackgroundColor, getTextColor} from '../css/color';

import {Modal, Box} from '@mui/material';

export default function ProfileModal(props) {
    const {profileModal, setProfileModal} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <Modal open={profileModal} onClose={() => setProfileModal(false)} aria-labelledby="Profile Modal" aria-describedby="Edit your profile">
            <Box className={`w-48 phone:w-72 h-auto p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-6 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="text-xl">Profile</header>
            </Box>
        </Modal>
    );
}

ProfileModal.propTypes = {
    profileModal: PropTypes.bool,
    setProfileModal: PropTypes.func
};