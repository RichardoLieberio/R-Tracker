import {createSlice} from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        expenses: null,
        expenseCategories: null,
        users: null
    },
    reducers: {
        setUsers: function(state, action) {
            state.users = action.payload;
        }
    }
});

export const {setUsers} = dataSlice.actions;

export default dataSlice.reducer;