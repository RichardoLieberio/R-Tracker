import {useSelector} from 'react-redux';

export default function Dashboard() {
    const accessToken = useSelector((state) => state.auth.accessToken);

    return (
        <>
            <h1>Dashboard Page</h1>
            <p>{accessToken}</p>
        </>
    );
}