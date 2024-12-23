import {createSlice} from '@reduxjs/toolkit';

export const userPageSlice = createSlice({
    name: 'userPage',
    initialState: {
        order: 'desc',
        orderBy: 'created_at',
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
        setPage: function(state, action) {
            state.page = action.payload < 1 ? 1 : action.payload;
        },
        setRowsPerPage: function(state, action) {
            state.rowsPerPage = state.rowsOption.includes(action.payload) ? action.payload : 5;
        },
        setUser: function(state, action) {
            state.user = action.payload;
        },
        clearUser: function(state) {
            state.user = null;
        },
        addProcess: function(state, action) {
            state.processing = [...state.processing, action.payload];
        },
        deleteProcess: function(state, action) {
            state.processing = state.processing.filter(id => id !== action.payload);
        }
    }
});

export const {setOrder, setOrderBy, setPage, setRowsPerPage, setUser, clearUser, addProcess, deleteProcess} = userPageSlice.actions;

export default userPageSlice.reducer;