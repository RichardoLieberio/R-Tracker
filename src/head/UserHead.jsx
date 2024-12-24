import {Helmet} from 'react-helmet-async';

export default function UserHead() {
    return (
        <Helmet>
            <title>R Tracker - User Management</title>
            <meta name="description" content="Manage and oversee all users on the platform. As an admin, you can view, edit, and control user accounts, including their permissions." />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
    );
}