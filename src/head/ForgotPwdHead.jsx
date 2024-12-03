import {Helmet} from 'react-helmet-async';

export default function ForgotPwdHead() {
    return (
        <Helmet>
            <title>R Tracker - Forgot Password</title>
            <meta name="description" content="Forgot your password? Reset it quickly and regain access to your R Tracker account to manage your expenses." />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
    );
}