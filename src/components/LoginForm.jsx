import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';
import themeConfig from '../../config/theme';

import getClassName from '../services/getClassName';

export default function LoginForm() {
    const tabletBreakpoint = useMediaQuery(`(min-width: ${breakpoints.tablet})`);

    const border = getClassName('border', 'purple', 'primary');
    console.log(border);

    return (
        <div className="flex absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 overflow-hidden rounded-2xl tablet:rounded-3xl" style={{boxShadow: `0 0 4px ${themeConfig.purple.shadow}`}}>
            {
                tabletBreakpoint &&
                <section className="w-56 h-auto phone:w-60 tablet:w-80 desktop:w-96 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/Login Image.jpeg")'}} />
            }
            <section className="w-56 phone:w-60 tablet:w-80 desktop:w-96 p-8 flex flex-col gap-10">
                <img src="/Logo.png" alt="R-Tracker Logo" width="32px" height="32px" />
                <form className="flex flex-col gap-4">
                    <h1 className="text-xl" style={{color: themeConfig.purple.text}}>Login</h1>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className={`w-full p-2 text-base border ${border} rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`} />
                    </div>
                    <button style={{color: themeConfig.purple.oppositeText, backgroundColor: themeConfig.purple.primary}}>Login</button>
                </form>
                <footer className="flex flex-col items-center gap-2">
                    <small className="text-sm" style={{color: themeConfig.purple.text}}>Contact us</small>
                    <span className="flex gap-2 tablet:gap-4">
                        <a href={process.env.GITHUB_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Github.png" alt="Github Icon" width="24px" height="24px" />
                        </a>
                        <a href={process.env.LINKEDIN_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Linkedin.png" alt="Linkedin Icon" width="24px" height="24px" />
                        </a>
                        <a href={process.env.INSTAGRAM_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Instagram.png" alt="Instagram Icon" width="24px" height="24px" />
                        </a>
                        <a href={process.env.WHATSAPP_URI} target="_blank" rel="noopener noreferrer" >
                            <img src="/Whatsapp.png" alt="Whatsapp Icon" width="24px" height="24px" />
                        </a>
                    </span>
                </footer>
            </section>
        </div>
    );
}