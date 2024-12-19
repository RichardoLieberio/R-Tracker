import {createSlice} from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        expenses: [],
        expenseCategories: [],
        users: []
    },
    reducers: {
        setExpenses: function(state, action) {
            state.expenses = action.payload;
        }
    }
});

export const {setExpenses} = dataSlice.actions;

export default dataSlice.reducer;