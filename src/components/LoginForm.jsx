import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

export default function LoginForm() {
    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    return (
        <form className="flex absolute right-1/2 top-1/2 translate-x-1/2 translate-y-1/2 bg-red-300">
            {
                tabletBreakpoint &&
                <section className="">

                </section>
            }
            <section className="">
                <h1>Login form</h1>
            </section>
        </form>
    );
}