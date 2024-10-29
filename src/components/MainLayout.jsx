import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

export default function MainLayout({children}) {
    const theme = useSelector((state) => state.theme.color);

    return (
        <main className="w-full h-screen" style={{backgroundColor: theme.background}}>
            {children}
        </main>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};