import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {setAuthentication} from '../redux/authSlice';

export default function EmailVerified() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(function() {
        setTimeout(function() {
            navigate('/', {replace: true});
            dispatch(setAuthentication(true));
        }, 3000);
    }, [navigate, dispatch]);

    return (
        <section className="w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-full mx-auto py-24 flex flex-col gap-8">
            <img src="/Email Verified.png" alt="Email Verified" loading="lazy" className="w-20 phone:w-28 tablet:w-36 desktop:w-44 mx-auto" />
            <div className="flex flex-col gap-4">
                <h2 className="mx-auto text-2xl text-purple-text font-semibold">Your Account is Verified</h2>
                <p className="text-purple-text">Your account is now verified, and you&apos;re all set to start exploring. Enjoy full access to all our features!</p>
            </div>
        </section>
    );
}