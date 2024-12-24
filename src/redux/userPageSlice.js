import {createSlice} from '@reduxjs/toolkit';

export const userPageSlice = createSlice({
    name: 'userPage',
    initialState: {
        order: 'desc',
        orderBy: 'created_at',
        search: '',
        page: 1,
        rowsPerPage: 5,
        rowsOption: [5, 10, 25],
        user: null,
        processing: []
    },
    reducers: {
        setOrder: function(state, action) {
            state.order = action.payload;
        },
        setOrderBy: function(state, action) {
            state.orderBy = action.payload;
        },
        setSearch: function(state, action) {
            state.search = action.payload;
        },
        setPage: function(state, action) {
            state.page = action.payload < 1 ? 1 : action.payload;
        },
        setRowsPerPage: function(state, action) {
            state.rowsPerPage = state.rowsOption.includes(action.payload) ? action.payload : 5;
        },
        setUser: function(state, action) {
            state.user = action.payload;
        },
        clearUser: function(state, action) {
            if (state.user._id === action.payload) state.user = null;
        },
        checkAndAddBlacklist: function(state, action) {
            const {data, setBlacklistModal} = action.payload;
            const {_id, ...blacklistProps} = data;

            if (state.user._id === _id) {
                state.user = {...state.user, ...blacklistProps};
                setBlacklistModal(false);
            }
        },
        addProcess: function(state, action) {
            state.processing = [...state.processing, action.payload];
        },
        deleteProcess: function(state, action) {
            state.processing = state.processing.filter(id => id !== action.payload);
        }
    }
});

export const {setOrder, setOrderBy, setSearch, setPage, setRowsPerPage, setUser, clearUser, checkAndAddBlacklist, addProcess, deleteProcess} = userPageSlice.actions;

export default userPageSlice.reducer;