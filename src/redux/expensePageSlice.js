import {createSlice} from '@reduxjs/toolkit';

export const expensePageSlice = createSlice({
    name: 'expensePage',
    initialState: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
    reducers: {
        
    }
});

// export const {changeTheme, changePage} = expensePageSlice.actions;

export default expensePageSlice.reducer;