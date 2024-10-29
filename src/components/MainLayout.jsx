import PropTypes from 'prop-types';

export default function MainLayout({children}) {
    return (
        <main className="w-full h-screen bg-grey-200">
            {children}
        </main>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};