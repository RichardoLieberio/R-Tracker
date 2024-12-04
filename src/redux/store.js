import {configureStore} from '@reduxjs/toolkit';

import webReducer from './webSlice';
import authReducer from './authSlice';

export default configureStore({
    reducer: {
        web: webReducer,
        auth: authReducer
    }
});