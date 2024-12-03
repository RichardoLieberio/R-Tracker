import {useEffect} from 'react';

export default function NotAuthenticated(Component) {
    return function NotAuthenticatedWrapper(props) {
        useEffect(function() {
            console.log('Not Authenticated');
        }, []);

        return <Component {...props} />;
    }
}