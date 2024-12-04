import {useSelector} from 'react-redux';

import {getBgPrimaryColor} from '../css/color';

export default function Header() {
    const theme = useSelector((state) => state.theme.color);

    return (
        <header className={`h-10 mx-auto ${getBgPrimaryColor(theme)}`}>
            <ul className="flex gap-4">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </header>
    );
}