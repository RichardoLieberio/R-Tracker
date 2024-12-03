import {Outlet} from 'react-router-dom';

import Header from './Header';

export default function PageLayout() {
    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <section className="flex-1 relative">
                <Outlet />
            </section>
        </div>
    );
}