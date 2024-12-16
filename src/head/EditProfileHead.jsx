import {Helmet} from 'react-helmet-async';

export default function EditProfileHead() {
    return (
        <Helmet>
            <title>R Tracker - Edit Profile</title>
            <meta name="description" content="Update your account information or manage your profile settings on R Tracker." />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
    );
}