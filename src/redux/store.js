import {configureStore} from '@reduxjs/toolkit';

import webReducer from './webSlice';
import authReducer from './authSlice';
import dataReducer from './dataSlice';
import expensePageReducer from './expensePageSlice';
import userPageReducer from './userPageSlice';
import categoryPageReducer from './categoryPageSlice';

export default configureStore({
    reducer: {
        web: webReducer,
        auth: authReducer,
        data: dataReducer,
        expensePage: expensePageReducer,
        userPage: userPageReducer,
        categoryPage: categoryPageReducer
    }
});