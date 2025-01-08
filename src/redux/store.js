import {configureStore} from '@reduxjs/toolkit';

import webReducer from './webSlice';
import authReducer from './authSlice';
import dataReducer from './dataSlice';
import expensePageReducer from './expensePageSlice';
import chartPageReducer from './chartPageSlice';
import userPageReducer from './userPageSlice';
import categoryPageReducer from './categoryPageSlice';

export default configureStore({
    reducer: {
        web: webReducer,
        auth: authReducer,
        data: dataReducer,
        expensePage: expensePageReducer,
        chartPage: chartPageReducer,
        userPage: userPageReducer,
        categoryPage: categoryPageReducer
    }
});