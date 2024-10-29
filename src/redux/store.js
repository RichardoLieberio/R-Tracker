import {configureStore} from '@reduxjs/toolkit';

import themeReducer from './themeSlice';
import authReducer from './authSlice';

export default configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer
    }
});