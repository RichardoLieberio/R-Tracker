import {useSelector} from 'react-redux';

import {getTextColor} from '../css/color';

export default function NotFound() {
    const theme = useSelector((state) => state.theme.color);

    return (
        <main className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center ${getTextColor(theme)}`}>
            <h1 className="text-6xl font-semibold">404</h1>
            <p className="text-lg">Page Not Found</p>
        </main>
    );
}