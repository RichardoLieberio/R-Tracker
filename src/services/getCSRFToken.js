import axios from './axios';

async function getCSRFToken(setCSRFToken) {
    const {data} = await axios.get('/api/token/csrf');
    if (data?.status === 200 && data?.token) setCSRFToken(data.token);
}

export default getCSRFToken;