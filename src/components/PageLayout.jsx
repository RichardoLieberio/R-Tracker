import {Outlet} from 'react-router-dom';

import Header from './Header';
import ScrollTop from './ScrollTop';

export default function PageLayout() {
    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <section className="flex-1 relative pt-12">
                <Outlet />
            </section>
            <ScrollTop />
        </div>
    );
}