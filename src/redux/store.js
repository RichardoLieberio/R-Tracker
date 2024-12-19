import {configureStore} from '@reduxjs/toolkit';

import webReducer from './webSlice';
import authReducer from './authSlice';
import dataReducer from './dataSlice';

export default configureStore({
    reducer: {
        web: webReducer,
        auth: authReducer,
        data: dataReducer
    }
});