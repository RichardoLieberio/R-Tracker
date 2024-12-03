import {useEffect} from 'react';

export default function Admin(Component) {
    return function AdminWrapper(props) {
        useEffect(function() {
            console.log('Admin');
        }, []);

        return <Component {...props} />;
    }
}