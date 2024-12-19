import {useEffect} from 'react';

import {getToast} from '../services/toastService';

export default function NotFound() {
    useEffect(function() {
        getToast();
    }, []);

    return (
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-6xl font-semibold">404</h1>
            <p className="text-lg">Page Not Found</p>
        </main>
    );
}