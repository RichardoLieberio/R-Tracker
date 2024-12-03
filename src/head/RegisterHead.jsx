import {Helmet} from 'react-helmet-async';

export default function RegisterHead() {
    return (
        <Helmet>
            <title>R Tracker - Register</title>
            <meta name="description" content="Create an account on R Tracker to easily manage your expenses and financial goals." />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
    );
}