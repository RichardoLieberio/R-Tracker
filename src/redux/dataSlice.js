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
        },
        deleteUser: function(state, action) {
            state.user = state.user.filter(user => user._id !== action.payload);
        }
    }
});

export const {setUsers, deleteUser} = dataSlice.actions;

export default dataSlice.reducer;