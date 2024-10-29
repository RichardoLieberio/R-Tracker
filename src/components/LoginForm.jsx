import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';
import themeConfig from '../../config/theme';

export default function LoginForm() {
    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    return (
        <form className="flex absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 bg-red-300" style={{boxShadow: `0 0 4px ${themeConfig.purple.shadow}`}}>
            {
                tabletBreakpoint &&
                <section className="w-56 h-auto phone:w-60 tablet:w-80 desktop:w-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/Login Image.jpeg")'}} />
            }
            <section className="w-56 phone:w-60 tablet:w-80 desktop:w-96">
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <h1>Login form</h1>
                <button style={{color: themeConfig.purple.oppositeText, backgroundColor: themeConfig.purple.primary}}>Login</button>
            </section>
        </form>
    );
}