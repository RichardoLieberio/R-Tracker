import {createSlice} from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        expenses: null,
        expenseCategories: null,
        users: null
    },
    reducers: {
        setExpenseCategories: function(state, action) {
            state.expenseCategories = action.payload;
        },
        addExpenseCategory: function(state, action) {
            const {data, name} = action.payload;
            state.expenseCategories = [{...data, created_by: {_id: data.created_by, name}}, ...state.expenseCategories];
        },
        updateExpenseCategory: function(state, action) {
            state.expenseCategories = state.expenseCategories.map(category => category._id === action.payload._id ? action.payload : category);
        },
        deleteExpenseCategory: function(state, action) {
            state.expenseCategories = state.expenseCategories.filter(category => category._id !== action.payload);
        },
        setUsers: function(state, action) {
            state.users = action.payload;
        },
        changeInfo: function(state, action) {
            const {_id, ...props} = action.payload;
            state.users = state.users.map(user => {
                if (user._id !== _id) return user;
                return {...user, ...props};
            });
        },
        removeBlacklist: function(state, action) {
            state.users = state.users.map(user => {
                if (user._id === action.payload) {
                    delete user.blacklisted;
                    delete user.blacklist_reason;
                    delete user.blacklisted_by;
                    delete user.blacklisted_at;
                }
                return user;
            });
        },
        deleteUser: function(state, action) {
            state.users = state.users.filter(user => user._id !== action.payload);
        }
    }
});

export const {setExpenseCategories, addExpenseCategory, updateExpenseCategory, deleteExpenseCategory, setUsers, changeInfo, removeBlacklist, deleteUser} = dataSlice.actions;

export default dataSlice.reducer;