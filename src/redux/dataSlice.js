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
        addBlacklist: function(state, action) {
            const {_id, ...blacklistProps} = action.payload;
            state.users = state.users.map(user => {
                if (user._id !== _id) return user;
                return {...user, ...blacklistProps};
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

export const {setUsers, addBlacklist, removeBlacklist, deleteUser} = dataSlice.actions;

export default dataSlice.reducer;