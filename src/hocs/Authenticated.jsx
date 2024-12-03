import {useEffect} from 'react';

export default function Authenticated(Component) {
    return function AuthenticatedWrapper(props) {
        useEffect(function() {
            console.log('Authenticated');
        }, []);

        return <Component {...props} />;
    }
}