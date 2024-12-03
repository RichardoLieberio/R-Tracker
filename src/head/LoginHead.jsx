import {Helmet} from 'react-helmet-async';

export default function LoginHead() {
    return (
        <Helmet>
            <title>R Tracker - Login</title>
            <meta name="description" content="Login page for R Tracker. Secure login to manage your expenses." />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
    );
}